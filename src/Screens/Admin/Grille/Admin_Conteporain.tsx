
import Grid from "../../../Component/grid/grid/grid"

const Admin_Contemporain = ()=>{
    return <div className="w-full h-fit flex center mb-4">
        <div className="w-[60%] ">

            <Grid canEdit={true} gridId="grid-contemporain" showDescription/>
        </div>
    </div>
}

export default Admin_Contemporain