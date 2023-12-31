import React,{useEffect, useState} from "react";
import {Link,  useNavigate} from 'react-router-dom';
import {CLEAR_APP_MESSAGES} from "../../services/actions";
import {
    Button,
    Input,
    PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ErrorMessage from "../../components/error/error-message";
import {saveNewPwd} from "../../services/actions/user";
import {selectAppMessage,  selectUser} from "../../services/selectors/selectors";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";

export type TNewPwd = {password: string; token: string}

const ResetPasswordPage = () => {
    const error = useAppSelector(selectAppMessage);
    const dispatch = useAppDispatch();
    const [newPwd, setNewPwd] = useState<TNewPwd>({password: '', token: ''});

    const navigate = useNavigate();
    const {isEmailSend} = useAppSelector(selectUser);

    const resetPwd = (e: React.SyntheticEvent) =>{
        e.preventDefault()
        dispatch(saveNewPwd(newPwd))
        !error && navigate('/login', { replace: true })
    }

    useEffect(()=>{
        !isEmailSend && navigate('/', {replace: true});
        dispatch({
            type: CLEAR_APP_MESSAGES,
            message:'reset'
        })
    },[])

    return <main className="page">
        <div className="form-box text-center">
            <div className="text text_type_main-medium mb-6">Восстановление пароля</div>
            <form  onSubmit={resetPwd}>
                <PasswordInput
                    name={"password"}
                    extraClass="mb-6"
                    placeholder={"Введите новый пароль"}
                    onChange={(e) => setNewPwd({ ...newPwd, password: e.target.value })}
                    value={''}
                />
                <Input
                    type={"text"}
                    placeholder={"Введите код из письма"}
                    name="token"
                    extraClass="mb-6"
                    onChange={(e) => setNewPwd({ ...newPwd, token: e.target.value })}
                    value={''}
                />
                {error && <ErrorMessage text={error}/>}
                <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                    >
                    Сохранить
                </Button>
            </form>

            <div className="mt-20 text text_type_main-default text_color_inactive">
                Вспомнили пароль? <Link to="/login">Войти</Link>
            </div>
        </div>
    </main>
}

export default ResetPasswordPage
