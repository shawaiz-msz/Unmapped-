import clsx from 'clsx'

const variants = {
  default: 'bg-teal-50 text-teal-800 border-teal-200',
  risk: 'bg-red-50 text-red-700 border-red-200',
  durable: 'bg-green-50 text-green-700 border-green-200',
  adjacent: 'bg-amber-50 text-amber-800 border-amber-200',
}

export default function SkillTag({ label, variant = 'default' }) {
  return (
    <span className={clsx(
      'inline-block px-3 py-1 text-sm rounded-full border font-medium',
      variants[variant]
    )}>
      {label}
    </span>
  )
}