import style from './../app/ui/ProgressComponent.module.css'



const ProgressComponent = () => {


  return (
    <div className={style.containerLoader}>
    <span className={style.loader}></span>
    </div>

  );
}

export default ProgressComponent;
