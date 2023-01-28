import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Dropdown({ list}) {
    // console.log("bitcoin", list);
    return (
        <>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex w-full rounded-md bg-gray-100 px-3 py-2 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                        <ChevronDownIcon
                            className="-mr-1 ml-8 h-4 w-5"
                            aria-hidden="true"
                        />
                    </Menu.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            {Array.isArray(list) &&
                                list.map((el, i) => {
                                    return (
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(
                                                        active
                                                            ? "bg-gray-100 text-gray-900"
                                                            : "text-gray-700",
                                                        "block px-4 py-2 text-sm"
                                                    )}
                                                >
                                                    {el.rates[0]}
                                                </a>
                                            )}
                                        </Menu.Item>
                                    );
                                })}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </>
    );
}

// import React from "react";

// const Dropdown = ({ list, selectedIndex, onSelected, name }) => {
//     console.log("down",list)

//     return (
//         <div>
//                 <select>
//                    <option>
//                     javed
//                    </option>
//                    <option>
//                     {list.id}
//                    </option>
//                 </select>
//         </div>
//     );
// };

// export default Dropdown;
