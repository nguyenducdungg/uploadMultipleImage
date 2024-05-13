import { Button } from "../Atoms/Button";

type TUploadButton = {
  handleUpload: () => void
  uploading: boolean
  disable: boolean
}

const UploadButton = ({ handleUpload, uploading, disable }: TUploadButton) => (
  <Button
    type="button"
    className="mt-4 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 disabled:bg-gray-500"
    onClick={handleUpload}
    disabled={uploading || disable}
  >
    {uploading ? 'Uploading...' : 'Upload'}
  </Button>
);

export default UploadButton