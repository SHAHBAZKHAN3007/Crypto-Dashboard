import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function MultiSelect({ options , onItemClick, values}) {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="text-transform: capitalize inline-flex w-full justify-center rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                    {values.length ? values[0] + (values[1] ? `, ${values[1]}` : ``) : 'Cryptocurrency'}
                    <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
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
                <Menu.Items className="absolute left-0 md:left-auto md:right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="p-1 h-80 overflow-y-auto">
                        {
                            options.sort((a,b) => {return values.includes(a.id) ? -1 : 1 }).map((el, i) => (
                                <Menu.Item key={i}>
                                    {({ active }) => (
                                        <button
                                            onClick={() => onItemClick(el.id)}
                                            // href="#"
                                            className={classNames(
                                                values.includes(el.id) ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-4 py-2 text-sm mb-1 w-full'
                                            )}
                                        >
                                            {el.name}
                                        </button>
                                    )}
                                </Menu.Item>
                            ))
                        }

                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
