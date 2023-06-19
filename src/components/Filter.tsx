// "use client";
import React, { FC, useState } from "react";
import { FilterTypes, PokemonTypeList } from "../type";

interface Props {
  typeList: PokemonTypeList[];
  onResetFilter: () => void;
  onSubmitFilter: (filter: FilterTypes) => void;
}

const Filter: FC<Props> = ({ typeList, onResetFilter, onSubmitFilter }) => {
  const [isFilterActive, setIsFilterActive] = useState<boolean>(false);
  const [filter, setFilter] = useState<FilterTypes>({
    name: "",
    type: "",
  });
  const handleChange = (key: string, value: string) => {
    setFilter((prev: any) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };
  const handleApplyFilter = () => {
    if (!filter.name && !filter.type) {
      return;
    }
    setIsFilterActive(true);
    onSubmitFilter(filter);
  };

  const handleResetFilter = () => {
    setIsFilterActive(false);
    setFilter({
      name: "",
      type: "",
    });
    onResetFilter();
  };
  return (
    <div className="w-full bg-yellow-500 px-8 py-4 rounded-lg mb-4 flex justify-between items-center">
      <div>
        <label className="mr-4 font-bold" htmlFor="name">
          Name :
        </label>
        <input
          value={filter.name}
          id="name"
          className="px-4 py-2 rounded-lg mr-8"
          type="text"
          onChange={(e) => handleChange("name", e.currentTarget.value)}
          placeholder="Search by name"
        />
        <label className="mr-4 font-bold" htmlFor="name">
          Type :
        </label>
        <select
          value={filter.type}
          id="type"
          className="px-4 py-2 rounded-lg"
          onChange={(e) => handleChange("type", e.currentTarget.value)}
        >
          <option value={""}>All</option>
          {typeList.map((type, index) => (
            <option key={index} value={type.name}>
              {type.name[0].toUpperCase() +
                type.name.slice(1, type.name.length)}
            </option>
          ))}
        </select>
      </div>
      <div>
        {isFilterActive ? (
          <button className="p-4 bg-red-500 text-white rounded-xl hover:bg-red-700 duration-200" onClick={handleResetFilter}>Reset</button>
        ) : null}
        <button className="ml-4 p-4 bg-white rounded-xl hover:bg-gray-300 duration-200 font-bold" onClick={handleApplyFilter}>Apply</button>
      </div>
    </div>
  );
};

export default Filter;
