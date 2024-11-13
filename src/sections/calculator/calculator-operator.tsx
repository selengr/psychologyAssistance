import { Button } from "@mui/material";


interface ICalculatorNumber {
    operator: string
    handleOperator: (content: string, type: string) => void
}


const CalculatorNumber = ({ operator, handleOperator }: ICalculatorNumber) => {
    return (
        <>

            <Button sx={{ border: '1px solid white', width: 33, height: 33, minWidth: 33, color: "#1758BA", backgroundColor: "#1758BA1A", margin: "2px", fontWeight: 500 }}
                onClick={() => handleOperator(operator, "OPERATOR")}>
                {operator as string}
            </Button>


        </>
    );
}

export default CalculatorNumber;