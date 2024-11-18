"use client"

import { useCallback, useRef, useState } from "react";

// import ContentEditable from "react-contenteditable";

import ReactDOMServer from "react-dom/server";
// import ReactHtmlParser from "react-html-parser";

import Iconify from "@/components/iconify/Iconify";
import CalculatorClear from "@/sections/calculator/calculator-clear";
import CalculatorNumber from "@/sections/calculator/calculator-number";
import CalculatorItem from "@/sections/calculator/calculator-number";
import CalculatorOperator from "@/sections/calculator/calculator-operator";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Container, Grid, IconButton, Input, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import AdvancedFormulaCalculator from "@/sections/calculator/advancedFormulaEditor";
import ContentEditable from 'react-contenteditable'
import styles from '../../sections/calculator/advancedFormulaEditor.module.css'
import { AnyAaaaRecord } from "dns";


type OPERATOR_TYPE = "OPERATOR" | "NUMBER" | "AVG" | string
type CALCULATE_TYPE = {
    type: OPERATOR_TYPE
    content: string
}






const Page = () => {
    const [scriptJSON, setScriptJSON] = useState<any>([])
    const [html, setHtml] = useState<any>([])
    const contentEditable2 = useRef<any>();



    const handleUndo = useCallback(() => {
        const editableDiv = contentEditable2.current;
        if (!editableDiv) return;

        const selection = window.getSelection();
        const range = selection?.getRangeAt(0);

        let elementToRemove: Element | null = null;

        if (range && editableDiv.contains(range.startContainer)) {
            // If there's a selection, remove the element at the cursor
            let node: any = range.startContainer;
            while (node && node !== editableDiv) {
                if (node.nodeType === Node.ELEMENT_NODE && (node as Element).classList.contains('dynamicbtn')) {
                    elementToRemove = node as Element;
                    break;
                }
                node = node.parentNode;
            }
        }

        if (!elementToRemove) {
            // If no element is selected, remove the last element
            elementToRemove = editableDiv.lastElementChild;
        }

        if (elementToRemove) {
            elementToRemove.remove();
            setHtml(editableDiv.innerHTML);
        }

        editableDiv.focus();
    }, []);




    const handleFnFX = () => {
        setScriptJSON((prevState: CALCULATE_TYPE[]) => [...prevState, {

            type: "AVG",
            content: ""
        },
        {
            type: "OPERATOR",
            content: "("
        },
        {
            type: "OPERATOR",
            content: ")"
        },




        ]);
    };


    const handleChange = (evt: any) => {
        console.log('evt.target.value :>> ', evt.target.value);
        setHtml(evt.target.value)
    };



    // const handleOperator = (content: string, type: OPERATOR_TYPE) => {
    //     console.log('e :>> ', content, type);
    //     var currenHTML = html;

    //     const newField = ReactDOMServer.renderToString(
    //         <div className={`${styles.dynamicbtn} ${styles[type]}`} contentEditable={"false"}>
    //             {content}
    //         </div>
    //     );


    //     const text = content;
    //     const renderToString = ReactDOMServer.renderToString(
    //         <div
    //             className={`${styles.dynamicbtn} ${styles[type]}`}

    //             // counter={this.state.counter}
    //             contentEditable={"false"}
    //         >
    //             {text}

    //         </div>
    //     );


    //     currenHTML += renderToString;
    //     // currenHTML += "&nbsp;";

    //     setHtml(currenHTML)




    //     if (type === "NUMBER") {
    //         setScriptJSON((prevState: CALCULATE_TYPE[]) => {
    //             const newState = [...prevState];

    //             if (newState.length > 0 && newState[newState.length - 1]?.type === "NUMBER") {
    //                 const lastIndex = newState.length - 1;
    //                 newState[lastIndex] = {
    //                     ...newState[lastIndex],
    //                     content: newState[lastIndex].content + content
    //                 };
    //             } else {
    //                 newState.push({ type, content });
    //             }

    //             return newState;
    //         });
    //     } else {
    //         setScriptJSON((prevState: CALCULATE_TYPE[]) => [...prevState, { type, content }]);
    //     }



    // }

    const handleOperator = (content: string, type: OPERATOR_TYPE) => {
        const selection = window.getSelection();
        const range = selection?.getRangeAt(0);
        const editableDiv = contentEditable2.current;

        if (!editableDiv) return;

        const newElement = document.createElement('div');
        newElement.className = `${styles.dynamicbtn} ${styles[type]}`;
        newElement.contentEditable = 'false';
        newElement.textContent = content;

        if (range && editableDiv.contains(range.startContainer)) {
            // this  line will ==> Insert at cursor position
            range.insertNode(newElement);
            range.setStartAfter(newElement);
        } else {
            //but this line will ==> append to the end
            editableDiv.appendChild(newElement);
        }


        setHtml(editableDiv.innerHTML);

        editableDiv.focus();
    };




    const handleNewField = () => {
        const selection = window.getSelection();
        const range = selection?.getRangeAt(0);
        const editableDiv = contentEditable2.current;

        if (!editableDiv) return;

        const newElement = document.createElement('div');
        const newSelectElement = document.createElement('select');
        const newOptionElement = document.createElement('option');
        const newOptionElement2 = document.createElement('option');
        newElement.className = `${styles.dynamicbtn} ${styles["NEW_FIELD"]}`;
        newElement.contentEditable = 'false';
        newOptionElement.textContent = "content";
        newOptionElement2.textContent = "reza";

        // if (range && editableDiv.contains(range.startContainer)) {
        //     // this  line will ==> Insert at cursor position
        //     range.insertNode(newElement);
        //     range.setStartAfter(newElement);
        // } else {
        //but this line will ==> append to the end
        // newElement.appendChild(newSelectElement);
        // newSelectElement.appendChild(newOptionElement);
        // newSelectElement.appendChild(newOptionElement2);
        editableDiv.appendChild(newElement);
        // }


        setHtml(editableDiv.innerHTML);

        editableDiv.focus();
    };








    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (!/^[0-9+\-*/().()]$/.test(event.key) &&
            !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(event.key)) {
            event.preventDefault();
        }
        if (event.key === "Enter") {
            event.preventDefault();
        }
    };

    const numbers = ['0', '.', '7', '8', '9', '4', '5', '6', '1', '2', '3'];
    const operators = ['+', '-', '*', '/'];

    console.log('html :>> ', html);

    const renderKeypad = () => {


        return (
            <>
                <Box sx={{ width: "30%", display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "start", mt: 3 }} gap={"3px"}>



                    <Select
                        sx={{
                            '& .MuiSelect-select': {
                                padding: 1,
                            },
                            width: 145,
                            height: 33,
                            fontWeight: 500,
                            backgroundColor: "#9D2CDF1A",
                            color: "white",
                            borderColor: "none",
                            '&:before, &:after': {
                                border: 'none', // Remove the underline border
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                border: 'none', // Remove the outlined border
                            },
                        }}

                        // {...field}
                        // displayEmpty={!!placeholder}
                        // labelId={name}
                        // input={<OutlinedInput fullWidth label={label} error={!!error} />}
                        // renderValue={renderValues}
                        MenuProps={{
                            PaperProps: {
                                sx: { px: 1, maxHeight: 280, minHeight: 180 },
                            },
                        }}
                        // ic_fx.svg
                        onChange={handleFnFX}
                    // onChange={(e) => {
                    //     field.onChange(e.target.value);
                    //     if (!setProp) return;

                    //     e.target.value === 'SHORT_TEXT' ? setProp(true) : setProp(false);
                    // }}
                    // {...other}
                    >

                        {["میانگین   ()"].map((option: any) => {
                            // const selected = field?.value?.includes(option?.value);

                            return (
                                <MenuItem
                                    key={option}
                                    value={option}
                                    sx={{
                                        py: 1,
                                        px: 2,
                                        height: 33,
                                        borderRadius: 1.75,
                                        typography: 'body2',
                                        backgroundColor: "#9D2CDF !important",
                                        color: "white",
                                        margin: "5px",
                                        // ...(selected && {
                                        //     fontWeight: 'fontWeightMedium',
                                        // }),
                                        // ...(checkbox && {
                                        //     p: 0.25,
                                        // }),
                                    }}
                                >
                                    {/* {checkbox && <Checkbox disableRipple size="small" checked={selected} />} */}

                                    {option}
                                </MenuItem>
                            );
                        })}
                    </Select>



                    <Button sx={{
                        border: '1px solid white',
                        width: 145,
                        height: 33,
                        fontWeight: 500,
                        // borderRadius: "6px",
                        color: "#1758BA", backgroundColor: "#1758BA1A"
                    }}
                        onClick={() => handleNewField()}
                    >
                        فیلد جدید
                    </Button>
                    <Stack sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>

                        <Grid gridColumn={3} sx={{ width: "20%", display: "flex", flexDirection: "column", marginRight: "4px" }} >

                            <CalculatorOperator operator={'('} handleOperator={handleOperator} />
                            {operators.map((op) => {
                                return <CalculatorOperator operator={op} handleOperator={handleOperator} />
                            })
                            }
                        </Grid>
                        <Grid gridColumn={3} sx={{ width: "80%" }} spacing={5} gap={5} rowGap={5} columnGap={6}>
                            <CalculatorOperator operator={')'} handleOperator={handleOperator} />
                            <CalculatorClear handleClear={handleUndo} />
                            {numbers.reverse().map((num) => {
                                return <CalculatorNumber number={num} handleOperator={handleOperator} />
                            })
                            }
                            {/* <CalculatorNumber number={'.'} handleOperator={handleOperator} /> */}
                            {/* <CalculatorNumber number={"0"} size={70} handleOperator={handleOperator} /> */}
                        </Grid>


                    </Stack>



                </Box>
            </>
        );
    };



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

                    {renderKeypad()}
                    {/* <Stack sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Grid container spacing={1}>
                            <Grid item xs={3}>
                                <Button onClick={() => handleOperator('(', 'OPERATOR')}>{'('}</Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button onClick={() => handleOperator(')', 'OPERATOR')}>{')'}</Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button onClick={() => setHtml('')}>Clear</Button>
                            </Grid>
                            {numbers.reverse().map((num) => (
                                <Grid item xs={4} key={num}>
                                    <Button onClick={() => handleOperator(num, 'NUMBER')}>{num}</Button>
                                </Grid>
                            ))}
                            {operators.map((op) => (
                                <Grid item xs={3} key={op}>
                                    <Button onClick={() => handleOperator(op, 'OPERATOR')}>{op}</Button>
                                </Grid>
                            ))}
                        </Grid>
                    </Stack> */}

                    <Box sx={{ width: "70%", display: "flex", flexDirection: "column", alignItems: "start" }}>
                        <Typography variant="subtitle1" sx={{ display: "flex", justifyContent: "center", color: "#404040", fontWeight: 500 }}>اسکریپت:</Typography>
                        <Stack spacing={4} sx={{ border: '1px solid #DDE1E6', borderRadius: 2, padding: 1, width: "100%", height: "100%", display: "flex", flexWrap: "wrap", flexDirection: "row" }}>


                            <ContentEditable
                                // ref={this.textInput}
                                onKeyDown={handleKeyDown}
                                className={styles.ContentEditable}
                                innerRef={contentEditable2}
                                html={html}
                                autoFocus={true}
                                disabled={false}
                                onChange={handleChange} // handle innerHTML change
                                // tagName="article" // Use a custom HTML tag (uses a div by default)
                                contentEditable={"true"}
                            />
                            {/* <AdvancedFormulaCalculator scriptJSON={scriptJSON} setScriptJSON={setScriptJSON} html={html} handleChange={handleChange} /> */}
                        </Stack>


                    </Box>

                </Grid>


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