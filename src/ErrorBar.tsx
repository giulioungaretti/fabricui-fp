export interface IErrorBarProps {
    error: string;
}

const ErrorBar = (p: IErrorBarProps) => (
    <div>
        {p.error}
    </div>
);

export default ErrorBar