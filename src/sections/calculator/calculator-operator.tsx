import { Button } from "@mui/material";


const CalculatorNumber = ({ operator }: { operator: string }) => {
    return (
        <>

            <Button sx={{ border: '1px solid white', width: 33, height: 33, minWidth: 33, color: "#1758BA", backgroundColor: "#1758BA1A", margin: "2px", fontWeight: 500 }} >
                {operator as string}
            </Button>


        </>
    );
}

export default CalculatorNumber;