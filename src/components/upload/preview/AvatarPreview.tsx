//
// import Image from '../../image';
//
import Image from 'next/image';
import { CustomFile } from '../types';

// ----------------------------------------------------------------------

type Props = {
  file: CustomFile | string | null;
};

export default function AvatarPreview({ file }: Props) {
  if (!file) {
    return null;
  }

  const imgUrl = typeof file === 'string' ? file : file.preview;

  return (
    <Image
      alt="avatar"
      src={imgUrl??""}
      width={100}
      height={100}
      //  style={{
      //   zIndex: 8,
      //   overflow: 'hidden',
      //   borderRadius: '50%',
      //   position: 'absolute',
      //   width: `calc(100% - 16px)`,
      //   height: `calc(100% - 16px)`,
      // }}
      
      // sx={{
      //   zIndex: 8,
      //   overflow: 'hidden',
      //   borderRadius: '50%',
      //   position: 'absolute',
      //   width: `calc(100% - 16px)`,
      //   height: `calc(100% - 16px)`,
      // }}
    />
  );
}
