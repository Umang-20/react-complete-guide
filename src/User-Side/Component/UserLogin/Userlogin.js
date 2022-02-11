import React, {useState, useEffect} from "react";
import style from "./Userlogin.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useDispatch, useSelector} from "react-redux";
import {fetchingInitiate} from "../../../Redux/User-Side/Action/DataFetchActions";
import {
    faUser,
    faEnvelope,
    faUniversity,
    faKey,
} from "@fortawesome/free-solid-svg-icons";
import Student_Login_Initialize from "../../../Redux/User-Side/Action/StudentLoginActions";


function Userlogin() {

    // const [error1, setError1] = useState('');
    // const [error2, setError2] = useState('');
    // const [error3, setError3] = useState('');
    // const [error4, setError4] = useState('');
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        username: '',
        email: '',
        clgname: '',
        code: '',
    });
    const [unicode, setUnicode] = useState([]);
    const {data} = useSelector((state) => state.allExams)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchingInitiate())
    }, [dispatch])


    useEffect(() => {

        if (data.length) {
            const ucode = []
            for (let key in data) {
                ucode.push(data[key].uniqueCode)
            }
            setUnicode(ucode)
        }

    }, [data])

//Validating User
//     function handleValidation() {
//         let fields = form;
//         let formIsValid = true;
//
//         setError1('')
//         setError2('')
//         setError3('')
//         setError4('')
//         //Name
//         if (!fields.username) {
//
//             setError1('Name Cannot be empty')
//             formIsValid = false;
//
//         }
//
//
//         if (fields.username.length > 0) {
//             if (!fields.username.match(/^[a-zA-Z]+$/)) {
//                 console.log('data.selectedQues', data);
//                 setError1('Name Should be Only letters')
//                 formIsValid = false;
//
//             }
//         }
//
//         //Email
//         if (!fields.email) {
//
//             setError2('Email Cannot be empty')
//             formIsValid = false;
//
//         }
//
//         if (fields.email.length > 0) {
//             let lastAtPos = fields.email.lastIndexOf("@");
//             let lastDotPos = fields.email.lastIndexOf(".");
//
//             if (
//                 !(
//                     lastAtPos < lastDotPos &&
//                     lastAtPos > 0 &&
//                     fields.email.indexOf("@@") === -1 &&
//                     lastDotPos > 2 &&
//                     fields.email.length - lastDotPos > 2
//                 )
//             ) {
//
//                 setError2('Email is not valid')
//                 formIsValid = false;
//
//             }
//         }
//         //college
//         if (!fields.clgname) {
//
//             setError3('College Cannot be empty')
//             formIsValid = false;
//
//         }
//
//         if (!fields.code) {
//
//             setError4('Key Cannot be empty')
//             formIsValid = false;
//
//         }
//
//         if (fields.code.length > 0) {
//             const found = unicode.find(element => element === form.code)
//             console.log('found', found);
//             if (!found) {
//                 setError4("Please Enter Valid Key!!")
//                 formIsValid = false;
//             }
//         }
//
//         return formIsValid;
//     }

    // console.log(unicode)
//Login Handler
    const submitHandler = (e) => {
        e.preventDefault()
        const isEmpty = !Object.values(form).every(x => (x !== ''));
        const found = unicode.find(element => element === form.code)
        // console.log(isEmpty);
        if(isEmpty || !form.username.match(/^[a-zA-Z]+$/)){
            setError("Enter Details Properly");
        }
        else if(!found){
            setError("Invalid Key");
        }
        else {
            // let Qid = []
            // history.push('/exam')
            // localStorage.setItem('code', form.code)
            // for (let key in data) {
            //     if (data[key].uniqueCode === form.code) {
            //         Qid = data[key].selectedQues
            //     }
            // }
            // setquesId(Qid)
            // dispatch(questionFetchingInitiate(Qid))
            // console.log('form', form);
            // localStorage.setItem('setname', form.username)
            // localStorage.setItem('setclgname', form.clgname)
            dispatch(Student_Login_Initialize(form))
        }
    }

    return (
        <>
            <div className={style.background}>
                <div className={style.logincard}>
                    <div className={style.container1}>
                        <img
                            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyNS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDI1MDAgNDQ0LjA4IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyNTAwIDQ0NC4wODsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCgkuc3Qwe2ZpbGw6dXJsKCNTVkdJRF8xXyk7fQ0KCS5zdDF7ZmlsbDojMTMzMDRDO30NCgkuc3Qye2ZpbGw6dXJsKCNTVkdJRF8yXyk7fQ0KCS5zdDN7ZmlsbDp1cmwoI1NWR0lEXzNfKTt9DQoJLnN0NHtmaWxsOnVybCgjU1ZHSURfNF8pO30NCgkuc3Q1e2ZpbGw6dXJsKCNTVkdJRF81Xyk7fQ0KCS5zdDZ7ZmlsbDp1cmwoI1NWR0lEXzZfKTt9DQoJLnN0N3tmaWxsOnVybCgjU1ZHSURfN18pO30NCgkuc3Q4e2ZpbGw6dXJsKCNTVkdJRF84Xyk7fQ0KCS5zdDl7ZmlsbDp1cmwoI1NWR0lEXzlfKTt9DQoJLnN0MTB7ZmlsbDp1cmwoI1NWR0lEXzEwXyk7fQ0KCS5zdDExe2ZpbGw6dXJsKCNTVkdJRF8xMV8pO30NCgkuc3QxMntmaWxsOnVybCgjU1ZHSURfMTJfKTt9DQo8L3N0eWxlPg0KPGcgaWQ9IkxheWVyXzEiPg0KPC9nPg0KPGcgaWQ9IkxheWVyXzIiPg0KCTxsaW5lYXJHcmFkaWVudCBpZD0iU1ZHSURfMV8iIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iMzg5LjI2IiB5MT0iLTY0LjE2NTUiIHgyPSIzODYuNTI5OCIgeTI9IjQwMi43MTI0Ij4NCgkJPHN0b3AgIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6IzAwRUFFRiIvPg0KCQk8c3RvcCAgb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojMUI3NUJDIi8+DQoJPC9saW5lYXJHcmFkaWVudD4NCgk8cmVjdCB4PSIzNTIuMzEiIHk9IjExMy43OCIgY2xhc3M9InN0MCIgd2lkdGg9IjcwLjM5IiBoZWlnaHQ9IjI0Mi43NiIvPg0KCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik03NDUuNjIsMjM1LjE2YzAsNzYuMjYtNTIuNzksMTI0Ljk5LTEyMC45MywxMjQuOTljLTMwLjIzLDAtNTUuMDUtOS40OC03My4xLTI5LjMzdjExMy4yNkg0ODEuMnYtMzMwLjNoNjcuMjMNCgkJdjI3Ljk4YzE3LjYtMjEuMjEsNDMuNzctMzEuNTksNzYuMjYtMzEuNTlDNjkyLjgzLDExMC4xNyw3NDUuNjIsMTU4LjksNzQ1LjYyLDIzNS4xNnogTTY3NC4zMywyMzUuMTYNCgkJYzAtNDEuOTYtMjYuNjItNjcuMjMtNjEuODItNjcuMjNjLTM1LjE5LDAtNjEuODIsMjUuMjctNjEuODIsNjcuMjNjMCw0MS45NiwyNi42Miw2Ny4yMyw2MS44Miw2Ny4yMw0KCQlDNjQ3LjcxLDMwMi4zOSw2NzQuMzMsMjc3LjEyLDY3NC4zMywyMzUuMTZ6Ii8+DQoJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEwMzMuNzgsMjE3LjU2djEzOC45OGgtNzAuMzlWMjI4LjM5YzAtMzkuMjYtMTguMDUtNTcuMzEtNDkuMTgtNTcuMzFjLTMzLjg0LDAtNTguMjEsMjAuNzYtNTguMjEsNjUuNDMNCgkJdjEyMC4wM2gtNzAuMzlWMjEuNzNIODU2djExNy4zMmMxOC45NS0xOC45NSw0Ni4wMi0yOC44OCw3Ny4xNi0yOC44OEM5OTAuNDcsMTEwLjE3LDEwMzMuNzgsMTQzLjU2LDEwMzMuNzgsMjE3LjU2eiIvPg0KCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xMzI5LjYyLDI1NS4wMWgtMTgzLjY1YzYuNzcsMzAuMjMsMzIuNDksNDguNzMsNjkuNDksNDguNzNjMjUuNzIsMCw0NC4yMi03LjY3LDYwLjkyLTIzLjQ2bDM3LjQ1LDQwLjYxDQoJCWMtMjIuNTYsMjUuNzItNTYuNCwzOS4yNi0xMDAuMTcsMzkuMjZjLTgzLjkzLDAtMTM4LjUzLTUyLjgtMTM4LjUzLTEyNC45OWMwLTcyLjY1LDU1LjUtMTI0Ljk5LDEyOS41LTEyNC45OQ0KCQljNzEuMjksMCwxMjYuMzQsNDcuODMsMTI2LjM0LDEyNS44OUMxMzMwLjk3LDI0MS40OCwxMzMwLjA3LDI0OS4xNSwxMzI5LjYyLDI1NS4wMXogTTExNDUuMDcsMjEzLjk1aDExOS41OA0KCQljLTQuOTYtMzAuNjgtMjcuOTgtNTAuNTQtNTkuNTYtNTAuNTRDMTE3My4wNCwxNjMuNDEsMTE1MC4wMywxODIuODIsMTE0NS4wNywyMTMuOTV6Ii8+DQoJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE1MjQuMDgsMTEwLjE3djY0Ljk4Yy01Ljg3LTAuNDUtMTAuMzgtMC45LTE1Ljc5LTAuOWMtMzguODEsMC02NC41MywyMS4yMS02NC41Myw2Ny42OHYxMTQuNjFoLTcwLjM5VjExMy43OA0KCQloNjcuMjN2MzIuMDRDMTQ1Ny43NSwxMjIuMzUsMTQ4Ni42MywxMTAuMTcsMTUyNC4wOCwxMTAuMTd6Ii8+DQoJPGc+DQoJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0yMTkuNDUsMjgzLjU0Yy0xNC44Nyw4LjkyLTMyLjI3LDE0LjA1LTUwLjg2LDE0LjA1Yy0xOC41OCwwLTM1Ljk5LTUuMTMtNTAuODYtMTQuMDUNCgkJCWMtMTMuOTgtOC4zOS0yNS43Mi0yMC4xMy0zNC4wOC0zNC4xMWMtOC45Mi0xNC44Ny0xNC4wNS0zMi4yNS0xNC4wNS01MC44M3M1LjEzLTM1Ljk5LDE0LjA1LTUwLjg2DQoJCQljOC4zOS0xMy45OCwyMC4xMy0yNS43MiwzNC4xMS0zNC4wOGMxNC44Ny04LjkyLDMyLjI1LTE0LjA1LDUwLjgzLTE0LjA1YzE4LjU4LDAsMzUuOTYsNS4xMyw1MC44MywxNC4wNQ0KCQkJYzEzLjk4LDguMzYsMjUuNzIsMjAuMSwzNC4xMSwzNC4wOGw1MC4xMS01MC4xMWMtOS42OS0xMi45Mi0yMS4xNi0yNC40Mi0zNC4xMS0zNC4wOGMtMjguMTUtMjEuMDktNjMuMS0zMy41OC0xMDAuOTQtMzMuNTgNCgkJCVM5NS44MSw0Mi40Nyw2Ny42Niw2My41NmMtMTIuOTQsOS42Ny0yNC40MiwyMS4xNi0zNC4xMSwzNC4wOEMxMi40OSwxMjUuNzksMCwxNjAuNzQsMCwxOTguNjFzMTIuNDksNzIuODEsMzMuNTUsMTAwLjk0DQoJCQljOS42OSwxMi45NCwyMS4xNiwyNC40MiwzNC4xMSwzNC4wOGMyOC4xNSwyMS4wOSw2My4xLDMzLjU3LDEwMC45NCwzMy41N3M3Mi43OS0xMi40OSwxMDAuOTQtMzMuNTcNCgkJCWMxMi45NC05LjY3LDI0LjQyLTIxLjE0LDM0LjExLTM0LjA4bC01MC4xMS01MC4xMUMyNDUuMTcsMjYzLjQyLDIzMy40MywyNzUuMTYsMjE5LjQ1LDI4My41NHoiLz4NCgk8L2c+DQoJPGxpbmVhckdyYWRpZW50IGlkPSJTVkdJRF8yXyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSIzODguMTE0NyIgeTE9Ii02NC4xNzIyIiB4Mj0iMzg1LjM4NDQiIHkyPSI0MDIuNzA1NyI+DQoJCTxzdG9wICBvZmZzZXQ9IjAiIHN0eWxlPSJzdG9wLWNvbG9yOiMwMEVBRUYiLz4NCgkJPHN0b3AgIG9mZnNldD0iMSIgc3R5bGU9InN0b3AtY29sb3I6IzFCNzVCQyIvPg0KCTwvbGluZWFyR3JhZGllbnQ+DQoJPHBhdGggY2xhc3M9InN0MiIgZD0iTTQxNS4yOSwxMS41MWMtMTUuMzUtMTUuMzUtNDAuMjMtMTUuMzQtNTUuNTcsMC4wMXYwYy0xNS4zMywxNS4zNC0xNS4zMyw0MC4yMSwwLjAxLDU1LjU1DQoJCWMxNS4zNCwxNS4zNCw0MC4yLDE1LjM0LDU1LjU1LDAuMDFDNDMwLjYzLDUxLjczLDQzMC42MywyNi44NSw0MTUuMjksMTEuNTFMNDE1LjI5LDExLjUxeiIvPg0KCTxsaW5lYXJHcmFkaWVudCBpZD0iU1ZHSURfM18iIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iMTY5My42NjQ4IiB5MT0iLTU2LjUzNzQiIHgyPSIxNjkwLjkzNDQiIHkyPSI0MTAuMzQwNSI+DQoJCTxzdG9wICBvZmZzZXQ9IjAiIHN0eWxlPSJzdG9wLWNvbG9yOiMwMEVBRUYiLz4NCgkJPHN0b3AgIG9mZnNldD0iMSIgc3R5bGU9InN0b3AtY29sb3I6IzFCNzVCQyIvPg0KCTwvbGluZWFyR3JhZGllbnQ+DQoJPHBhdGggY2xhc3M9InN0MyIgZD0iTTE3MDMuNjcsMTE3LjM5Yy00MS4wNiwwLTczLjA4LDE2LjY5LTkwLjI0LDQ1LjU4di00My43OGgtMzAuNjd2MjM3LjM1aDMyLjAzVjIzMg0KCQljMC01NC4xNCwzMi4wNS04NS43NCw4My4wMy04NS43NGM0NS4xMywwLDcxLjMsMjUuNzIsNzEuMyw3NS44MXYxMzQuNDdoMzIuMDNWMjE4LjkxDQoJCUMxODAxLjE0LDE1MC43OSwxNzYxLjQzLDExNy4zOSwxNzAzLjY3LDExNy4zOXoiLz4NCgk8bGluZWFyR3JhZGllbnQgaWQ9IlNWR0lEXzRfIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjE5NTkuODg4NyIgeTE9Ii01NC45ODA1IiB4Mj0iMTk1Ny4xNTg0IiB5Mj0iNDExLjg5NzMiPg0KCQk8c3RvcCAgb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojMDBFQUVGIi8+DQoJCTxzdG9wICBvZmZzZXQ9IjEiIHN0eWxlPSJzdG9wLWNvbG9yOiMxQjc1QkMiLz4NCgk8L2xpbmVhckdyYWRpZW50Pg0KCTxwYXRoIGNsYXNzPSJzdDQiIGQ9Ik0yMDM0LjIxLDI0My43M2MwLDU0LjE0LTMxLjEzLDg2LjE5LTgwLjc2LDg2LjE5Yy00NS4xMywwLTcxLjMtMjUuNzItNzEuMy03Ni4yNlYxMTkuMTloLTMyLjA1djEzNy42Mw0KCQljMCw2OC4xNSwzOS43MywxMDEuOTgsMTAwLjE3LDEwMS45OGMzNy45LDAsNjguNi0xNi42OSw4NS4yOS00NS41OHY0My4zM2gzMC43VjExOS4xOWgtMzIuMDVWMjQzLjczeiIvPg0KCTxsaW5lYXJHcmFkaWVudCBpZD0iU1ZHSURfNV8iIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iMjQwNS43Njk1IiB5MT0iLTUyLjM3MyIgeDI9IjI0MDMuMDM5MyIgeTI9IjQxNC41MDQ4Ij4NCgkJPHN0b3AgIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6IzAwRUFFRiIvPg0KCQk8c3RvcCAgb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojMUI3NUJDIi8+DQoJPC9saW5lYXJHcmFkaWVudD4NCgk8cG9seWdvbiBjbGFzcz0ic3Q1IiBwb2ludHM9IjIzNDcuOTQsMzI5LjkyIDI0OTcuMywxNDAuNCAyNDk3LjMsMTE5LjE5IDIzMDkuNTgsMTE5LjE5IDIzMDkuNTgsMTQ2LjI2IDI0NTYuMjQsMTQ2LjI2IA0KCQkyMzA2Ljg4LDMzNS4zMyAyMzA2Ljg4LDM1Ni41NCAyNTAwLDM1Ni41NCAyNTAwLDMyOS45MiAJIi8+DQoJPGxpbmVhckdyYWRpZW50IGlkPSJTVkdJRF82XyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSIyMTg4LjkyNjgiIHkxPSItNTMuNjQxMSIgeDI9IjIxODYuMTk2NSIgeTI9IjQxMy4yMzY3Ij4NCgkJPHN0b3AgIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6IzAwRUFFRiIvPg0KCQk8c3RvcCAgb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojMUI3NUJDIi8+DQoJPC9saW5lYXJHcmFkaWVudD4NCgk8cG9seWdvbiBjbGFzcz0ic3Q2IiBwb2ludHM9IjIxODguOTUsNjcuMyAyMTU2LjkzLDY3LjMgMjE1Ni45MywxMTkuMTkgMjExNC41MiwxMTkuMTkgMjExNC41MiwxNDYuMjYgMjE1Ni45MywxNDYuMjYgDQoJCTIxNTYuOTMsMjg5Ljc2IDIxNTYuOTMsMzU2LjU0IDIxODguOTUsMzU2LjU0IDIxODguOTUsMzUwLjgxIDIxODguOTUsMTQ2LjI2IDIyNjEuMTYsMTQ2LjI2IDIyNjEuMTYsMTE5LjE5IDIxODguOTUsMTE5LjE5IAkiLz4NCjwvZz4NCjwvc3ZnPg0K"
                            alt="ciphernutz"
                        />
                    </div>
                    <div className={style.container2}>
                        <h3>Personal Details</h3>
                        <form onSubmit={submitHandler} className={style.form}>
                            <div className={style.inputbox}>
                                <FontAwesomeIcon icon={faUser}/>
                                <input type="text" placeholder="Name"
                                       value={form.username}
                                       onChange={(e) => {setForm({...form, username: e.target.value});setError("")}}
                                />
                            </div>
                            {/*<span style={{color: "red"}}>{error1}</span>*/}


                            <div className={style.inputbox}>
                                <FontAwesomeIcon icon={faEnvelope}/>

                                <input type="email" placeholder="example@abc.com"
                                       value={form.email}
                                       onChange={(e) => {setForm({...form, email: e.target.value});setError("")}}/>
                            </div>
                            {/*<span style={{color: "red"}}>{error2}</span>*/}

                            <div className={style.inputbox}>
                                <FontAwesomeIcon icon={faUniversity}/>
                                <input type="text" placeholder="Stanford University"
                                       value={form.clgname}
                                       onChange={(e) => {setForm({...form, clgname: e.target.value});setError("")}}/>
                            </div>
                            {/*<span style={{color: "red"}}>{error3}</span>*/}
                            <div className={style.inputbox}>
                                <FontAwesomeIcon icon={faKey}/>
                                <input type="text" placeholder="8a9dw84ad"
                                       value={form.code}
                                       onChange={(e) => {setForm({...form, code: e.target.value}); setError("")}}/>
                            </div>
                            {/*<span style={{color: "red"}}>{error4}</span>*/}
                            <span style={{color: "red"}}>{error}</span>
                            <button type='submit'>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Userlogin;
