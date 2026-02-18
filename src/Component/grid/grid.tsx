import 'gridstack/dist/gridstack.min.css';
import { GridStack } from 'gridstack';
import { useEffect, useRef, useState } from 'react';
import { getGrid, GridType, updateGridPos } from '../../services/grid';
import { toast } from 'react-toastify';
type GridProps = {
    canEdit: boolean
}
const Grid = ({canEdit}:GridProps) => {
  const gridRef = useRef<GridStack | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [items, setItems] = useState<GridType[] | null>(null);

  // 1. Initialisation unique de GridStack
  useEffect(() => {
    if (!containerRef.current) return;

    gridRef.current = GridStack.init({
      cellHeight: 80,
      margin: 5,
      float: true, // Optionnel : permet de laisser des vides
    }, containerRef.current);

    return () => {
      gridRef.current?.destroy(false);
      gridRef.current = null;
    };
  }, []);

  // 2. Fetch data
  useEffect(() => {
    async function fetchData() {
      const res = await getGrid("grid-home");
      if (res.status === 200 && res.data) {
        setItems(res.data);
      }
    }
    fetchData();
  }, []);

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
    }, [canEdit]); 
    const [pendingChanges, setPendingChanges] = useState<Record<string, any>>({});

useEffect(() => {
  if (!gridRef.current) return;

  const grid = gridRef.current;

  grid.on('change', (event, items) => {
    const newChanges = { ...pendingChanges };

    items.forEach(item => {
      const id = item.el?.getAttribute('key-id');
      if (id) {
        newChanges[id] = {
          id: id,
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
    console.log('updates : ', updates)
  
    if (updates.length === 0) return;
        let save = await updateGridPos(updates)
        if(save.status === 200){
            toast.info("Positions des images mise a jour ! ")
        }
    
    }
  return (
    <div className='w-full h-fit flex flex-col gap-4 mt-4'>
        {canEdit ? <div className='sticky w-full h-8 flex center'>
            <div className='w-fit bg-green p-2 rounded-lg text-black font-mt-bold' onClick={()=>Save()}>
                Sauvegarder 
            </div>

        </div> : ''}
    <div className="grid-stack w-full min-h-[500px] bg-white" ref={containerRef}>
      {/* On laisse React générer le DOM initial */}
      {items?.map((item) => (
        <div
          key={item._id}
          className="grid-stack-item"
          gs-w={item.w}
          gs-h={item.h}
          gs-x={item.x}
          gs-y={item.y}
          key-id={item._id}
        >
          <div className="grid-stack-item-content bg-white shadow-md rounded flex flex-col items-center justify-center ">
            {item.image ? (
              <img 
                src={item.image} 
                alt="Widget" 
                className="w-full h-full object-cover rounded"
                draggable={false} // Important pour ne pas interférer avec le drag de GridStack
              />
            ) : (
              <p>Pas d'image</p>
            )}
            {/* <span className="text-xs mt-1 text-gray-500">Item {item._id}</span> */}
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Grid;