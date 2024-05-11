'use client'
import { RadioGroup } from '@headlessui/react'
import { RiCheckboxCircleLine } from '@remixicon/react'
import { useState } from 'react'
const plans = [
  { name: 'Startup', ram: '12GB', cpus: '6 CPUs', disk: '256GB SSD disk' },
  { name: 'Business', ram: '16GB', cpus: '8 CPUs', disk: '512GB SSD disk' },
  { name: 'Enterprise', ram: '32GB', cpus: '12 CPUs', disk: '1TB SSD disk' },
]

export default function RadioComponent() {
  const [selected, setSelected] = useState(plans[0])

  return (
    <div className="w-full px-4">
      <div className="mx-auto w-full max-w-md">
        <div className="w-full px-4 py-16">
          <div className="mx-auto w-full max-w-md">
            <RadioGroup value={selected} onChange={setSelected}>
              <RadioGroup.Label className="sr-only">
                Server size
              </RadioGroup.Label>
              <div className="space-y-2">
                {plans.map((plan) => (
                  <RadioGroup.Option
                    key={plan.name}
                    value={plan}
                    className={({ active, checked }) =>
                      `${
                        active
                          ? 'ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300'
                          : ''
                      }
                  ${checked ? 'bg-sky-900/75 text-white' : 'bg-white'}
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                    }
                  >
                    {({ active, checked }) => (
                      <>
                        <div className="flex w-full items-center justify-between">
                          <div className="flex items-center">
                            <div className="text-sm">
                              <RadioGroup.Label
                                as="p"
                                className={`font-medium  ${
                                  checked ? 'text-white' : 'text-gray-900'
                                }`}
                              >
                                {plan.name}
                              </RadioGroup.Label>
                              <RadioGroup.Description
                                as="span"
                                className={`inline ${
                                  checked ? 'text-sky-100' : 'text-gray-500'
                                }`}
                              >
                                <span>
                                  {plan.ram}/{plan.cpus}
                                </span>{' '}
                                <span aria-hidden="true">&middot;</span>{' '}
                                <span>{plan.disk}</span>
                              </RadioGroup.Description>
                            </div>
                          </div>
                          {checked && (
                            <div className="shrink-0 text-white">
                              <RiCheckboxCircleLine className="h-6 w-6" />
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
    </div>
  )
}
