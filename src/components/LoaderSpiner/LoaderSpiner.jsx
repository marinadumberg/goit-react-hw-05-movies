import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from './LoaderSpiner.module.css';

export default function LoaderSpiner() {
  return (
    <div className={s.Loader}>
    <Loader type="Circles" color="#00BFFF" height={80} width={80}/></div>
  );
}