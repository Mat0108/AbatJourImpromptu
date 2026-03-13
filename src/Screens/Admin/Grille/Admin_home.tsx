import Grid from "../../../Component/grid/grid/grid"

const Admin_home = ()=>{
    return <div className="w-full h-fit flex center">
        <div className="w-[60%] ">

            <Grid canEdit={true} gridId="grid-home"/>
        </div>
    </div>
}

export default Admin_home