import { UploadIcon } from "@/lib/assets/icon/UploadIcon";
import { Input } from "../Atoms/Input";

type TFileUpload = {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  refInput: any
}

const FileUpload = ({ handleFileChange, refInput }: TFileUpload) => {
  return (
    <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <UploadIcon />
        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload image</span></p>
        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG...</p>
      </div>
      <Input ref={refInput} id="file-upload" type="file" className="hidden" accept="image/*" multiple onChange={handleFileChange} />
    </label>
  );
}

export default FileUpload