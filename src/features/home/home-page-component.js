import { Disclosure, Listbox, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
  BriefcaseIcon,
  CalendarIcon,
  CheckCircleIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CurrencyDollarIcon,
  LinkIcon,
  LocationMarkerIcon,
  MailIcon,
  PencilIcon,
  SearchIcon,
} from '@heroicons/react/solid';
import { Fragment, useState } from 'react';

const user = {
  name: 'Whitney Francis',
  email: 'whitneyfrancis@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};
const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Jobs', href: '#', current: false },
  { name: 'Applicants', href: '#', current: false },
  { name: 'Company', href: '#', current: false },
];
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];
const tabs = [
  { name: 'Applied', href: '#', count: '2', current: false },
  { name: 'Phone Screening', href: '#', count: '4', current: false },
  { name: 'Interview', href: '#', count: '6', current: true },
  { name: 'Offer', href: '#', current: false },
  { name: 'Disqualified', href: '#', current: false },
];
const candidates = [
  {
    name: 'Emily Selman',
    email: 'emilyselman@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    applied: 'January 7, 2020',
    appliedDatetime: '2020-07-01T15:34:56',
    status: 'Completed phone screening',
  },
  // More candidates...
];
const publishingOptions = [
  {
    name: 'Published',
    description: 'This job posting can be viewed by anyone who has the link.',
    current: true,
  },
  {
    name: 'Draft',
    description: 'This job posting will no longer be publicly accessible.',
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Home() {
  const [selected, setSelected] = useState(publishingOptions[0]);

  return (
    <div className="relative min-h-screen bg-white">
      {/* Navbar */}
      <Disclosure as="nav" className="bg-gray-50">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative h-16 flex items-center justify-between border-b border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-mark.svg?color=violet&shade=500"
                      alt="Workflow"
                    />
                  </div>

                  {/* Links section */}
                </div>

                <div className="flex lg:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="bg-gray-50 p-2 inline-flex items-center justify-center rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>

                {/* Actions section */}
                <div className="hidden lg:block lg:ml-4">
                  <div className="flex items-center">
                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative flex-shrink-0">
                      {({ open }) => (
                        <>
                          <div>
                            <Menu.Button className="bg-gray-50 rounded-full flex text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500">
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="rounded-full h-8 w-8"
                                src={user.imageUrl}
                                alt=""
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            show={open}
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items
                              static
                              className="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                              {userNavigation.map(item => (
                                <Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <a
                                      href={item.href}
                                      className={classNames(
                                        active ? 'bg-gray-100' : '',
                                        'block py-2 px-4 text-sm text-gray-700',
                                      )}
                                    >
                                      {item.name}
                                    </a>
                                  )}
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </>
                      )}
                    </Menu>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="bg-gray-50 border-b border-gray-200 lg:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map(item => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-100' : 'hover:bg-gray-100',
                      'block px-3 py-2 rounded-md font-medium text-gray-900',
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="px-5 flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="rounded-full h-10 w-10"
                      src={user.imageUrl}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {user.name}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {user.email}
                    </div>
                  </div>
                  <button className="ml-auto bg-gray-50 flex-shrink-0 rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500">
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  {userNavigation.map(item => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-100"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {/* Page heading */}
      <header className="bg-gray-50 py-8"></header>

      <main className="pt-8 pb-16">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Update your email
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>
                  Change the email address you want associated with your
                  account.
                </p>
              </div>
              <form className="mt-5 sm:flex sm:items-center">
                <div className="w-full sm:max-w-xs">
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="you@example.com"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
          <div className="px-4 sm:px-0">
            <h2 className="text-lg font-medium text-gray-900">Candidates</h2>

            {/* Tabs */}
            <div className="sm:hidden">
              <label htmlFor="tabs" className="sr-only">
                Select a tab
              </label>
              <select
                id="tabs"
                name="tabs"
                className="mt-4 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                defaultValue={tabs.find(tab => tab.current).name}
              >
                {tabs.map(tab => (
                  <option key={tab.name}>{tab.name}</option>
                ))}
              </select>
            </div>
            <div className="hidden sm:block">
              <div className="border-b border-gray-200">
                <nav className="mt-2 -mb-px flex space-x-8" aria-label="Tabs">
                  {tabs.map(tab => (
                    <a
                      key={tab.name}
                      href={tab.href}
                      className={classNames(
                        tab.current
                          ? 'border-purple-500 text-purple-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200',
                        'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
                      )}
                    >
                      {tab.name}
                      {tab.count ? (
                        <span
                          className={classNames(
                            tab.current
                              ? 'bg-purple-100 text-purple-600'
                              : 'bg-gray-100 text-gray-900',
                            'hidden ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block',
                          )}
                        >
                          {tab.count}
                        </span>
                      ) : null}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Stacked list */}
          <ul
            className="mt-5 border-t border-gray-200 divide-y divide-gray-200 sm:mt-0 sm:border-t-0"
            role="list"
          >
            {candidates.map(candidate => (
              <li key={candidate.email}>
                <a href="#" className="group block">
                  <div className="flex items-center py-5 px-4 sm:py-6 sm:px-0">
                    <div className="min-w-0 flex-1 flex items-center">
                      <div className="flex-shrink-0">
                        <img
                          className="h-12 w-12 rounded-full group-hover:opacity-75"
                          src={candidate.imageUrl}
                          alt=""
                        />
                      </div>
                      <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                        <div>
                          <p className="text-sm font-medium text-purple-600 truncate">
                            {candidate.name}
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-500">
                            <MailIcon
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            <span className="truncate">{candidate.email}</span>
                          </p>
                        </div>
                        <div className="hidden md:block">
                          <div>
                            <p className="text-sm text-gray-900">
                              Applied on{' '}
                              <time dateTime={candidate.appliedDatetime}>
                                {candidate.applied}
                              </time>
                            </p>
                            <p className="mt-2 flex items-center text-sm text-gray-500">
                              <CheckCircleIcon
                                className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                                aria-hidden="true"
                              />
                              {candidate.status}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <ChevronRightIcon
                        className="h-5 w-5 text-gray-400 group-hover:text-gray-700"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>

          {/* Pagination */}
        </div>
      </main>
    </div>
  );
}

export { Home };
