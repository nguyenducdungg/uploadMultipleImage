import { CancelIcon } from '@/lib/assets/icon/CancelIcon';
import { CheckIcon } from '@/lib/assets/icon/CheckIcon';
import { TrashIcon } from '@/lib/assets/icon/TrashIcon';
import Image from 'next/image';

type Tprops = {
  file: File;
  progress: number;
  error: boolean,
  success: boolean,
  uploading: boolean,
  handleRemove: (fileToRemove: File) => void
}

const UploadedFile = ({ file, progress, error, success,  handleRemove, uploading }: Tprops) => (
  <div key={file.name} className={`flex items-center border rounded-md p-1 mt-2 ${error ? 'border-red-500' : 'border-gray-300'}`}>
    {/* convert via blob for display. */}
    <Image
      src={URL.createObjectURL(file)}
      alt={file.name}
      width={0}
      height={0}
      className='h-20 w-20 mr-5 object-cover'
    />
    <div className="flex flex-col flex-grow mx-5">
      <div className='flex items-center justify-between'>
        <p className={`text-sm font-semibold xl:max-w-[1000px] max-w-96 truncate ${error ? 'text-red-500' : 'text-blue-500'}`}>
          {file.name}
        </p>
        <div>
          {error && !uploading && <CancelIcon />}
          {success && !uploading && <CheckIcon />}
        </div>
      </div>
      <div className="h-2 bg-gray-200 rounded-md mt-2">
        <div style={{ width: `${progress || 0}%` }} className={`h-full rounded-md ${error ? 'bg-red-500' : 'bg-blue-500'}`} />
      </div>
    </div>
    <div className="flex justify-between items-center mt-2 cursor-pointer" onClick={() => handleRemove(file)}>
      <TrashIcon />
    </div>
  </div>
);
export default UploadedFile