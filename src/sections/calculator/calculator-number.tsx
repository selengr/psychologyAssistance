import { Button } from "@mui/material";

interface ICalculatorNumber {
    number: number
    size?: number
    handleOperator: (content: number, type: string) => void
}

const CalculatorNumber = ({ number, size, handleOperator }: ICalculatorNumber) => {
    return (
        <>

            <Button sx={{
                border: '1px solid white', width: size ?? 33, height: 33, minWidth: size ?? 33, color: "#1758BA", backgroundColor: "#1758BA1A", margin: "2px",
                fontWeight: 500
            }}
                onClick={() => handleOperator(number, "NUMBER",)}
            >
                {number as number}
            </Button>


        </>
    );
}

export default CalculatorNumber;