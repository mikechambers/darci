

const ErrorView = (props) => {

    if (!props.error || props.error.length) {
        return "";
    }


    return (
        <div class="error">
            {props.error}
        </div>

    );
}

export default ErrorView;