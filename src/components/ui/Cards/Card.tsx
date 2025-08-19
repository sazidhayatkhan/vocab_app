import React from 'react'

type Props = {}

const Card = (props: Props) => {
  return (
    <div className='bg-white rounded-xl w-[300px] h-[360px] p-4 cursor-pointer border border-gray-400'>
        <div className='mt-20 space-y-6'>
            <p className='text-2xl font-bold text-center text-gray-700'>Paucity</p>
            <p className='text-center text-gray-500 text-sm'>the presence of something in only small or insufficient quantities or amounts.</p>
            <p className='text-center text-gray-500 text-sm'>অভাব, অনটন, অল্পতা, পরিমাণে স্বল্পতা</p>
            
        </div>
    </div>
  )
}

export default Card