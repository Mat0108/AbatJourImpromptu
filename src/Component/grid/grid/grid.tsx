import 'gridstack/dist/gridstack.min.css';
import { GridStack } from 'gridstack';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { getGrid, GridType, removeImageFromGrid, updateGridPos } from '../../../services/grid';
import { toast } from 'react-toastify';
import InputImage from '../../Inputs/InputFile';
import ImageEditor from '../../ImageEditor/imageEditor/ImageEditor';
import gridElem from "../gridElem/gridElem"
import GridElem from '../gridElem/gridElem';
import { usePopup } from '@/Component/popup/PopupContext';
import DescriptionUpdate from '@/Component/popup/description/description';
import Loading from '@/Component/Loading/Loading';
import { Link, useLocation } from 'react-router';
type GridProps = {
    canEdit?: boolean,
    showDescription?:boolean;
    gridId: string;
}
const Grid = ({canEdit,gridId,showDescription}:GridProps) => {
  const gridRef = useRef<GridStack | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [items, setItems] = useState<GridType[] | undefined>();
  const [reload,setReload] = useState(false)
  const {openPopup} = usePopup()
  const isMobile = window.screen.width < 600;
  
  const [pendingChanges, setPendingChanges] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  // 1. Initialisation unique de GridStack
  useEffect(() => {
    if (!containerRef.current) return;

    gridRef.current = GridStack.init({
      margin: isMobile ? 2 : 5,
      float: true, // Optionnel : permet de laisser des vides
      animate:false,
      cellHeight: 'auto', 
      minRow:5,
      columnOpts: {
        breakpoints: [
          { w: 0, c: 12, } // desktop
        ]
      }
    }, containerRef.current);

    return () => {
      gridRef.current?.destroy(false);
      gridRef.current = null;
    };
  }, []);

  // 2. Fetch data
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const res = await getGrid(gridId ?? "grid-home");
      if (res.status === 200 && res.data) {

        await Promise.all(
          res.data.map((src: string) => {
            return new Promise((resolve) => {
              const img = new Image();
              img.src = src;
              img.onload = resolve;
              img.onerror = resolve;
            });
          })
        ).then(()=>{
          setItems(res.data);
          setIsLoading(false);
          setReload(false);
        });


      }
    }
    fetchData();
  }, [reload]);

  // 3. Transformation des éléments DOM en Widgets GridStack
  useEffect(() => {
    if (!items || !gridRef.current) return;

    // On récupère tous les éléments enfants qui ont la classe .grid-stack-item
    // et qui ne sont pas encore gérés par GridStack
    const elements = containerRef.current?.querySelectorAll('.grid-stack-item');
    
    elements?.forEach((el) => {
      // makeWidget transforme l'élément existant en widget draggable/resizable
      gridRef.current?.makeWidget(el as HTMLElement);
    });
  }, [items]); // Se déclenche quand les items sont rendus dans le DOM
    useEffect(() => {
        if (!gridRef.current) return;

        // setStatic(true) désactive le drag AND le resize d'un seul coup
        // C'est plus propre que de désactiver l'un après l'autre
        gridRef.current.setStatic(!canEdit);

        // Optionnel : Ajouter une classe CSS sur le container pour le feedback visuel
        if (containerRef.current) {
        if (canEdit) {
            containerRef.current.classList.add('is-editing');
        } else {
            containerRef.current.classList.remove('is-editing');
        }
        }
    }, [canEdit,reload]); 

useEffect(() => {
  if (!gridRef.current) return;

  const grid = gridRef.current;

  grid.on('change', (event, items) => {
    const newChanges = { ...pendingChanges };
    console.log('newChanges : ', newChanges)

    items.forEach(item => {
      const id = item.el?.getAttribute('key-id');
      if (id) {
        newChanges[id] = {
          id: id,
          gridId: gridId,
          data: {
            w: item.w,
            h: item.h,
            x: item.x,
            y: item.y
          }
        };
      }
    });
    setPendingChanges(newChanges);
  });
}, [pendingChanges]);

  async function Save(){
    const updates = Object.values(pendingChanges);
  
    if (updates.length === 0) return;
        let save = await updateGridPos(updates)
        if(save.status === 200){
            toast.info("Positions des images mise a jour ! ");
        }
    
    }



    async function removeImage(imageId:string) {
        let res = await removeImageFromGrid({imageId,gridId})
        if(res.status === 200){
            toast.info("l'image a bien été supprimé");
            setReload(true);
        }
    }
  function updateDescription(imageId:string,description?:string){
    return openPopup(<DescriptionUpdate imageId={imageId} descriptionOrigin={description} gridId={gridId} setReload={()=>{setReload(true)}}/>)
  }
  const path = location.pathname.split("/")[2] 
  return (
    <div className='w-full h-fit flex flex-col gap-4 mt-4'>
      {isLoading && <div className='w-full h-[500px] flex center'><Loading/></div>}
      {canEdit ? <div className='sticky w-full h-8 flex center gap-4 relative '>
            <div className='w-fit bg-green p-2 rounded-lg text-black font-mt-bold' onClick={()=>Save()}>
                Sauvegarder 
            </div>
            <div className='w-fit bg-green p-2 rounded-lg text-black font-mt-bold' onClick={()=>{openPopup(<ImageEditor gridId={gridId} setReload={setReload}/>)}}>
              Ajouter des images 
            </div>
            {location.pathname.split("/").includes("admin") &&             <Link className='absolute right-0 top-0 w-fit bg-green p-2 rounded-lg text-black font-mt-bold' to={`/${path === "home" ? '':path}`} >Afficher cette page</Link> }
            </div> : ''}
    <div className="grid-stack w-full min-h-[500px] bg-white" ref={containerRef}>
      {/* On laisse React générer le DOM initial */}
      {items?.map((item,pos) => (
        <GridElem 
          id={item._id} 
          gridId={gridId}
          grid={item.grid?.find(g => g.gridId === gridId)}
          image={item.image}
          canEdit={canEdit}
          removeImage={removeImage}
          showDescription={showDescription}
          updateDescription={updateDescription}
          key={`item-${pos}`}
          />
      
      ))}
    </div>
    </div>
  );
};

export default Grid;