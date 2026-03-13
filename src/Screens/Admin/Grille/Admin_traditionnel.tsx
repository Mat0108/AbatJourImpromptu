
import Grid from "../../../Component/grid/grid/grid"
const Admin_traditionnel = ()=>{
    return <div className="w-full h-fit flex center mb-4">
        <div className="w-[60%] ">

            <Grid canEdit gridId="grid-traditionnel" showDescription/>
        </div>
    </div>
}

export default Admin_traditionnel