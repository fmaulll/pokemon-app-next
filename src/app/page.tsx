"use client";
import Filter from "@/components/Filter";
import Image from "next/image";
import axios from "axios";
import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Pokemon from "@/components/Pokemon";
import { FilterTypes, PokemonTypeList, PokemonTypes } from "../type";

type AllPokemonType = {
  name: string;
  url: string;
};

export default function Home() {
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [allPokemon, setAllPokemon] = useState<PokemonTypes[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [chosenPokemon, setChosenPokemon] = useState<PokemonTypes>({
    name: "",
    height: 0,
    id: 0,
    image: "",
    types: "",
    weight: 0,
  });
  const [typeList, setTypeList] = useState<PokemonTypeList[]>([]);
  const [filter, setFilter] = useState<FilterTypes>({
    name: "",
    type: "",
  });
  const observer = useRef();
  const lastPokemonElement = useCallback((node: any) => {}, [hasMore]);

  const getPokemon = async (pokemon: AllPokemonType) => {
    try {
      const result = await axios.get(pokemon.url);
      if (result.status === 200) {
        const { data } = result;
        setAllPokemon((prev) => {
          return [
            ...prev,
            {
              name:
                data.name[0].toUpperCase() +
                data.name.slice(1, data.name.length),
              image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
              height: data.height,
              weight: data.weight,
              id: data.id,
              types: data.types[0].type.name,
            },
          ];
        });
        setLoading(false);
      }
    } catch (error) {
      alert(error);
    }
  };

  const getAllPokemon = async () => {
    setLoading(true);
    try {
      const result = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}`
      );
      if (result.status === 200) {
        const { results } = result.data;
        results.map((item: AllPokemonType, index: number) => {
          getPokemon(item);
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  const getAllPokemonType = async () => {
    setLoading(true);
    try {
      const result = await axios.get("https://pokeapi.co/api/v2/type");
      if (result.status === 200) {
        const { results } = result.data;
        setTypeList(results);
      }
    } catch (error) {
      alert(error);
    }
  };

  const filterPokemon = (array: PokemonTypes[]) => {
    return array
      .filter((pokemon) => pokemon.name.toLowerCase().includes(filter.name))
      .filter((pokemon) => pokemon.types.toLowerCase().includes(filter.type));
  };

  const handleClickAddPokemon = (data: PokemonTypes) => {
    setChosenPokemon(data);
    handleOpenDialog();
    // addPokemon({ ...data, alias: "" });
  };

  const handleAddPokemon = (data: PokemonTypes, alias: string) => {
    if (!alias) {
      return;
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(!openDialog);
  };

  const handleChangeFilter = (filter: FilterTypes) => {
    setFilter(filter);
  };

  const handleResetFilter = () => {
    setFilter({
      name: "",
      type: "",
    });
  };

  useEffect(() => {
    getAllPokemon();
    getAllPokemonType();
  }, []);
  return (
    <main className="px-8 py-4 bg-gray-800">
      <Filter
        onResetFilter={handleResetFilter}
        typeList={typeList}
        onSubmitFilter={handleChangeFilter}
      />
      <div className="grid grid-cols-6 gap-4">
        {filterPokemon(allPokemon).map((item, index) => {
          if (allPokemon.length === index + 1) {
            return (
              <div>
                <Pokemon data={item} key={index} />
              </div>
            );
          } else {
            return (
              <div ref={lastPokemonElement}>
                <Pokemon data={item} key={index} />
              </div>
            );
          }
        })}
      </div>
    </main>
  );
}
