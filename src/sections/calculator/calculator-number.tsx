import { Button } from "@mui/material";

interface ICalculatorNumber {
    number: string
    size?: number
    handleOperator: (content: string, type: string) => void
}

const CalculatorNumber = ({ number, size, handleOperator }: ICalculatorNumber) => {
    return (
        <>

            <Button sx={{
                border: '1px solid white', width: number === "0" ? 70 : 33, height: 33, minWidth: number === "0" ? 70 : 33, color: "#1758BA", backgroundColor: "#1758BA1A", margin: "2px",
                fontWeight: 500
            }}
                onClick={() => handleOperator(number, "NUMBER",)}
            >
                {number as string}
            </Button>


        </>
    );
}

export default CalculatorNumber;