import clsx from 'clsx'

const STEPS = ['Context', 'Education', 'Languages', 'Experience', 'Profile']

export default function StepBar({ current }) {
  return (
    <div className="flex items-center justify-between mb-8 px-4">
      {STEPS.map((label, i) => {
        const idx = i + 1
        const done = idx < current
        const active = idx === current
        return (
          <div key={label} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div className={clsx(
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
                done && 'bg-teal-400 text-white',
                active && 'bg-teal-600 text-white ring-2 ring-teal-200',
                !done && !active && 'bg-gray-200 text-gray-500'
              )}>
                {done ? '✓' : idx}
              </div>
              <span className={clsx(
                'text-xs mt-1 hidden sm:block',
                active ? 'text-teal-700 font-medium' : 'text-gray-400'
              )}>{label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={clsx('flex-1 h-0.5 mx-2 transition-colors', done ? 'bg-teal-400' : 'bg-gray-200')} />
            )}
          </div>
        )
      })}
    </div>
  )
}