import { Play } from 'lucide-react'
import { MaterialModal } from '~shared/ui/modal'
import { useState } from 'react'

export const SpeakerVideo = ({ name, description, preview, videoUrl }: any) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={name}
        className="group relative block h-[320px] w-full overflow-hidden rounded-2xl bg-primary text-left"
      >
        <img
          src={preview}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />

        <span className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-white text-primary transition-transform duration-200 group-hover:scale-110">
          <Play size={18} fill="currentColor" />
        </span>

        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="text-[15px] font-semibold leading-snug text-white">{name}</p>
          <p className="mt-1 text-[13px] text-white/80">{description}</p>
        </div>
      </button>
      <MaterialModal
        videoUrl={videoUrl}
        handleClose={() => setOpen(false)}
        open={open}
        title={name}
        subtitle={description}
      />
    </>
  )
}
