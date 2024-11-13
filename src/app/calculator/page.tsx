"use client"

import { useState } from "react";
import Iconify from "@/components/iconify/Iconify";
import CalculatorClear from "@/sections/calculator/calculator-clear";
import CalculatorNumber from "@/sections/calculator/calculator-number";
import CalculatorItem from "@/sections/calculator/calculator-number";
import CalculatorOperator from "@/sections/calculator/calculator-operator";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Container, Grid, IconButton, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";




const Page = () => {
    const [scriptJSON, setScriptJSON] = useState<any>([])


    const handleOperator = (content: number, type: string) => {
        console.log('e :>> ', content, type);
        setScriptJSON([...scriptJSON, {
            type,
            content
        }])
    }


    return (
        <Container maxWidth="sm" sx={{ mt: "35px" }}>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <IconButton
                    aria-label="close"
                    // onClick={handleClose}
                    sx={{ marginX: 0.5, marginTop: 0.5, marginBottom: 0 }}
                >
                    <Iconify icon="mingcute:close-line" sx={{ width: 25, height: 25 }} />
                </IconButton>
            </Box>



            <Typography variant="subtitle1" sx={{ display: "flex", justifyContent: "center", color: "#404040" }}>محاسبه گر</Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    paddingX: 1.5,
                    direction: 'ltr',
                    width: '100%',
                }}
            >
                <Stack spacing={1}>
                    <Typography variant="subtitle2" color="#161616">نام:</Typography>

                    <TextField
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#DDE1E6', // Change this to your desired border color
                                },
                                '&:hover fieldset': {
                                    borderColor: '#DDE1E6', // Change this to your desired hover border color
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#DDE1E6', // Change this to your desired focused border color
                                },
                            },
                            '& input': {
                                padding: 1,
                                height: "50px",
                            },
                        }}
                        name="name"
                    />
                </Stack>

                <Grid sx={{ width: "100%", display: "flex", flexDirection: "row", my: 3 }}>
                    <Box sx={{ width: "30%", display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "start", mt: 3 }} gap={"3px"}>


                        <Button sx={{
                            border: '1px solid white',
                            width: 145,
                            height: 33,
                            fontWeight: 500,
                            // borderRadius: "6px",
                            color: "#1758BA", backgroundColor: "#1758BA1A"
                        }} >
                            فیلد جدید
                        </Button>
                        <Stack sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>

                            <Grid gridColumn={3} sx={{ width: "20%", display: "flex", flexDirection: "column", marginRight: "4px" }} >

                                <CalculatorOperator operator={'('} />
                                {["+", "-", "*", "/"].map((item) => {
                                    return <CalculatorOperator operator={item} />
                                })
                                }
                            </Grid>
                            <Grid gridColumn={3} sx={{ width: "80%" }} spacing={5} gap={5} rowGap={5} columnGap={6}>
                                <CalculatorOperator operator={')'} />
                                <CalculatorClear />
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => {
                                    return <CalculatorNumber number={item} handleOperator={handleOperator} />
                                })
                                }
                                <CalculatorOperator operator={'.'} />
                                <CalculatorNumber number={0} size={70} handleOperator={handleOperator} />
                            </Grid>


                        </Stack>



                    </Box>


                    <Box sx={{ width: "70%", display: "flex", flexDirection: "column", alignItems: "start" }}>
                        <Typography variant="subtitle1" sx={{ display: "flex", justifyContent: "center", color: "#404040", fontWeight: 500 }}>اسکریپت:</Typography>
                        <Stack spacing={4} sx={{ border: '1px solid #DDE1E6', borderRadius: 2, padding: 1, width: "100%", height: "100%", display: "flex", flexWrap: "wrap", flexDirection: "row" }}>
                            {scriptJSON.map((item: { content: number, type: string }) => {
                                if (item.type === "NUMBER") {

                                    return <Stack spacing={4} sx={{
                                        width: 33,
                                        height: 33,
                                        color: "#2CDFC9", backgroundColor: "#EAFCFA",
                                        fontWeight: 500,
                                        minWidth: 33,
                                        marginRight: "6px !important",
                                        marginTop: "0px !important",
                                        borderRadius: "6px",
                                        display: "flex", justifyContent: "center", alignItems: "center",
                                    }}
                                    >
                                        {item.content as number}
                                    </Stack>
                                }
                                return <Typography variant="subtitle1" sx={{ display: "flex", justifyContent: "center", color: "#404040", fontWeight: 500 }}>{item.content}</Typography>
                            })}

                        </Stack>


                    </Box>

                </Grid>

                <Stack spacing={1} marginTop={2.5}>
                    <Typography variant="subtitle2">نوع:</Typography>
                    <Select
                        sx={{
                            '& .MuiSelect-select': {
                                padding: 1,
                            },
                        }}
                        // {...field}
                        // displayEmpty={!!placeholder}
                        // labelId={name}
                        // input={<OutlinedInput fullWidth label={label} error={!!error} />}
                        // renderValue={renderValues}
                        MenuProps={{
                            PaperProps: {
                                sx: { px: 1, maxHeight: 280 },
                            },
                        }}
                    // onChange={(e) => {
                    //     field.onChange(e.target.value);
                    //     if (!setProp) return;

                    //     e.target.value === 'SHORT_TEXT' ? setProp(true) : setProp(false);
                    // }}
                    // {...other}
                    >

                        {[1, 2, 3, 4].map((option: any) => {
                            // const selected = field?.value?.includes(option?.value);

                            return (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                    sx={{
                                        py: 1,
                                        px: 2,
                                        borderRadius: 0.75,
                                        typography: 'body2',
                                        // ...(selected && {
                                        //     fontWeight: 'fontWeightMedium',
                                        // }),
                                        // ...(checkbox && {
                                        //     p: 0.25,
                                        // }),
                                    }}
                                >
                                    {/* {checkbox && <Checkbox disableRipple size="small" checked={selected} />} */}

                                    {option.label}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </Stack>

                <Box display="flex" gap={3} width="100%" marginTop={5} marginBottom={2} sx={{ display: "flex", justifyContent: "center" }}>
                    <LoadingButton
                        type="submit"
                        // disableRipple

                        // fullWidth
                        variant="contained"
                        // variant="outlined"
                        // loading={isSubmitting || isLoadingData}
                        sx={{
                            backgroundColor: "#1758BA",
                            fontWeight: '500',
                            fontSize: '15px',
                            height: '50px',

                            '&.MuiButtonBase-root:hover': {
                                backgroundColor: "#1758BA",
                                // bgcolor: "#F7F7FF",
                                // opacity : .9
                            },
                            minWidth: "132px",
                        }}
                    >
                        <Typography variant="body2" component={'p'} py={0.5} sx={{ color: "#fff", fontWeight: 500 }}>
                            تایید
                        </Typography>
                    </LoadingButton>

                    <Button
                        type="button"
                        variant="outlined"
                        // fullWidth
                        sx={{ height: '50px', minWidth: "132px", fontWeight: '500', fontSize: '15px', borderColor: "#1758BA", background: "#F7F7FF" }}
                    // onClick={handleClose}
                    >
                        <Typography variant="body2" component={'p'} py={0.5} color={"#1758BA"} sx={{ fontWeight: 500 }}>
                            انصراف
                        </Typography>
                    </Button>
                </Box>
            </Box>


        </Container>
    );


}

export default Page;