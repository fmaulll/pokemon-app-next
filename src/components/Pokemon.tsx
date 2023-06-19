import React, { FC } from "react";
import { PokemonTypes } from "../type";

interface Props {
  data: PokemonTypes;
}

const Pokemon: FC<Props> = ({ data }) => {
  return (
    <div className="relative rounded-lg w-full bg-white flex flex-col justify-center items-center p-4">
      <img src={data.image} alt={data.name} />
      <h1 className="font-bold text-xl">{data.name}</h1>
      <div>
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col justify-center items-center">
            <p>Height</p>
            <p>{data.height}</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p>Weight</p>
            <p>{data.weight}</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p>Type</p>
            <p>{data.types}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
