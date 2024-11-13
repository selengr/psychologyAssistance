import { Button } from "@mui/material";

interface ICalculatorNumber {
    number: number
    size?: number
}

const CalculatorNumber = ({ number, size }: ICalculatorNumber) => {
    return (
        <>

            <Button sx={{ border: '1px solid white', width: size ?? 33, height: 33, minWidth: size ?? 33, color: "#1758BA", backgroundColor: "#1758BA1A", margin: "2px" }} >
                {number as number}
            </Button>


        </>
    );
}

export default CalculatorNumber;