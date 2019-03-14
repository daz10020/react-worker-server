import { observable, action } from 'mobx';
class AppStore {

    @observable PushState = localStorage.getItem("thisToken")&&true||false;
    @observable IsLogin = localStorage.getItem("token")&&true||false;

    @action pushStateTrue=()=>{
        this.PushState=true;
    };
    @action pushStateFalse=()=> {
        this.PushState=false;
    };
    @action IsLoginTrue=()=>{
        this.IsLogin=true;
    };
    @action IsLoginFalse=()=> {
        this.IsLogin=false;
    };



    //计算长度
    // @computed get TodoListCount() {
    //     return this.PushState.length;
    // }

}
export default AppStore;