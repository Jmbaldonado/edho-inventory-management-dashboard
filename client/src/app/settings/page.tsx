'use client';

import { UserSettings } from '@/types/UserSettings';
import { useState } from 'react';
import Header from '@/app/(components)/Header';

const mockSettings: UserSettings[] = [
  {
    label: 'Username',
    type: 'text',
    value: 'john_doe',
  },
  {
    label: 'Email',
    type: 'text',
    value: 'john.doe@example.com',
  },
  {
    label: 'Notification',
    type: 'toggle',
    value: true,
  },
  {
    label: 'Dark Mode',
    type: 'toggle',
    value: false,
  },
  {
    label: 'Language',
    type: 'text',
    value: 'English',
  },
];

export default function Settings() {
  const [userSettings, setUserSettings] = useState<UserSettings[]>(mockSettings);

  const handleToggleChange = (index: number) => {
    const newSettings = [...userSettings];
    newSettings[index].value = !newSettings[index].value;
    setUserSettings(newSettings);
  };

  return (
    <div className='w-full'>
      <Header name='User Settings' />
      <div className='overflow-x-auto mt-5 shadow-md'>
        <table className='min-w-full bg-white rounded-lg'>
          <thead className='bg-gray-800 text-white'>
            <tr>
              <th className='text-left py-3 px-4 uppercase font-semibold text-sm'>Setting</th>
              <th className='text-left py-3 px-4 uppercase font-semibold text-sm'>Value</th>
            </tr>
          </thead>
          <tbody>
            {userSettings.map((setting, index) => (
                <tr className='hover:bg-blue-50' key={setting.label}>
                    <td className='py-2 px-4'>{setting.label}</td>
                    <td className='py-2 px-4'>{setting.type === 'toggle' ? (
                        <label className='inline-flex relative items-center cursor-pointer' aria-label={setting.label}>
                            <input type="checkbox" className='sr-only peer' checked={setting.value as boolean} onChange={() => handleToggleChange(index)} />
                            <div
                        className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-blue-400 peer-focus:ring-4 
                        transition peer-checked:after:translate-x-full peer-checked:after:border-white 
                        after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                        after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
                        peer-checked:bg-blue-600"
                      />
                        </label>
                    ) : (
                        <input
                        type="text"
                        className="px-4 py-2 border rounded-lg text-gray-500 focus:outline-none focus:border-blue-500"
                        value={setting.value as string}
                        onChange={(e) => {
                          const newSettings = [...userSettings];
                          newSettings[index].value = e.target.value;
                          setUserSettings(newSettings);
                        }}
                      />
                    ) }</td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
