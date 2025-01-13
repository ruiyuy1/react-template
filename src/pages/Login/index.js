import { useDispatch } from 'react-redux';
import { fetchLogin } from '../../store/modules/user';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = (values) => {
        dispatch(fetchLogin(values));
        navigate("/");
    };

    return (
        <div>
            <form onSubmit={onFinish}>
                <input type="text" placeholder="username" />
                <input type="password" placeholder="password" />
                <button type="submit">Login</button>
            </form>
            <div>This is Login</div>
        </div>
    );
}

export default Login;