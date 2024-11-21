"use client"

import { useCallback, useEffect, useRef, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SvgIcon from "@mui/material/SvgIcon";
import Image from 'next/image';

import ContentEditable from 'react-contenteditable'

//mui
import { LoadingButton } from "@mui/lab";
import { Box, Button, Container, Grid, IconButton, Input, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";


import Iconify from "@/components/iconify/Iconify";
import CalculatorClear from "@/sections/calculator/calculator-clear";
import CalculatorNumber from "@/sections/calculator/calculator-number";
import CalculatorItem from "@/sections/calculator/calculator-number";
import CalculatorOperator from "@/sections/calculator/calculator-operator";


import styles from '../../sections/calculator/advancedFormulaEditor.module.css'
import JSONData from '../../../public/assets/fake-data/add filed response_v1.json'



type OPERATOR_TYPE = "OPERATOR" | "NUMBER" | "AVG" | string
type CALCULATE_TYPE = {
    type: OPERATOR_TYPE
    content: string
}


const Page = () => {
    const contentEditable = useRef<any>();
    const newFieldRef = useRef<any>();
    const [html, setHtml] = useState<any>([])
    const [formula, setFormula] = useState<string>("")



    const handleUndo = useCallback(() => {
        const editableDiv = contentEditable.current
        if (!editableDiv) return

        const selection = window.getSelection()
        const range = selection?.getRangeAt(0)

        let elementToRemove

        if (range && !range.collapsed && editableDiv.contains(range.commonAncestorContainer)) {
            // If there's a selection, remove the selected content
            range.deleteContents()
        } else {
            // If there's no selection, remove the last element
            const children = Array.from(editableDiv.childNodes)
            elementToRemove = children[children.length - 1]

            if (elementToRemove) {
                editableDiv.removeChild(elementToRemove)
            }
        }

        // Update the HTML state
        setHtml(editableDiv.innerHTML)

        // Move the cursor to the end
        // const newRange = document.createRange()
        // newRange.selectNodeContents(editableDiv)
        // newRange.collapse(false)
        // selection?.removeAllRanges()
        // selection?.addRange(newRange)

        // Focus on the contentEditable div
        editableDiv.focus()
    }, [])


    const handleOperator = (content: string, type: OPERATOR_TYPE) => {
        const selection = window.getSelection();
        const range = selection?.getRangeAt(0);
        const editableDiv = contentEditable.current;

        if (!editableDiv) return;

        const newElement = document.createElement('div')
        newElement.className = `${styles.dynamicbtn} ${styles[type]}`;
        newElement.textContent = content
        newElement.contentEditable = 'false';
        newElement.setAttribute('data-type', type)
        // newElement.setAttribute('data-id', Date.now().toString())


        if (range && editableDiv.contains(range.startContainer)) {
            range.insertNode(newElement);
            range.setStartAfter(newElement);
        } else {
            editableDiv.appendChild(newElement);
        }

        setHtml(editableDiv.innerHTML);

        editableDiv.focus();
    };




    useEffect(() => {
        const editableDiv = contentEditable.current;
        editableDiv.focus();
    }, [])



    useEffect(() => {
        let initialFormula = "#avg({#q_1,#q_21,5})#q_1+#q_21-1+"
        // setHtml(parseFormula(initialFormula))
    }, [])


    const handleChange = (evt: any) => {
        console.log('evt.target.value .reeeeeeeeza :>> ', evt.target.value);
        const newHtml = evt.currentTarget


        // if (elements.contains('advancedFormulaEditor-module__uTdVNG__NEW_FIELD')) {
        //     const select = elements.querySelector('select');
        //     console.log('select reeeeeeeeza:>> ', select);
        //     // formula += '#q_' + (select?.id || '');
        // }

    };

    function htmlToFormula(html: string): string {
        const parser = new DOMParser()
        const doc = parser.parseFromString(html, 'text/html')
        const elements: HTMLCollection = doc.body.children

        let formula = ''



        for (const element of Array.from(elements)) {
            if (element instanceof HTMLDivElement) {
                const classList = element.classList;

                if (classList.contains('advancedFormulaEditor-module__uTdVNG__NUMBER')) {
                    formula += element.textContent || '';
                } else if (classList.contains('advancedFormulaEditor-module__uTdVNG__OPERATOR')) {
                    if (element.textContent == "+") {
                        formula += "+";
                    } else if (element.textContent == "-") {

                        formula += "-";
                    } else if (element.textContent == "*") {

                        formula += "*";
                    } else if (element.textContent == "/") {
                        formula += "/";
                    } else {
                        formula += element.textContent + "" || '';
                    }
                } else if (classList.contains('advancedFormulaEditor-module__uTdVNG__NEW_FIELD')) {
                    const select = element.querySelector('select');
                    console.log('select :>> ', select);
                    console.log('newFieldRef.current :>> ', newFieldRef.current);
                    formula += '#q_' + (select?.value || '');
                } else if (classList.contains('advancedFormulaEditor-module__uTdVNG__NEW_FnFx')) {
                    // debugger
                    const select = element.querySelector('select');
                    if (select) {
                        formula += '#avg' + select.value;
                    }
                }
            }
        }


        console.log("formulaformula", formula)
        return formula
    }



    const handleNewField = () => {
        const selection = window.getSelection();
        const range = selection?.getRangeAt(0);
        const editableDiv = contentEditable.current;

        if (!editableDiv) return;

        const newElement = document.createElement('div');
        newElement.className = `${styles.dynamicbtn} ${styles["NEW_FIELD"]}`;
        newElement.setAttribute('data-type', "NEW_FIELD");
        newElement.contentEditable = 'false';

        const newSelectElement = document.createElement('select');
        newSelectElement.setAttribute('ref', 'newFieldRef');
        newSelectElement.contentEditable = 'false';



        JSONData.dataList.forEach(item => {
            const newOptionElement = document.createElement('option');
            newOptionElement.value = item.value;
            newOptionElement.textContent = item.caption;
            newSelectElement.appendChild(newOptionElement);
        });


        // Create a change handler for the select element
        newSelectElement.onchange = (e: any) => {
            newFieldRef.current = evt.target.value
        };



        if (range && editableDiv.contains(range.startContainer)) {
            // this  line will ==> Insert at cursor position
            newElement.appendChild(newSelectElement);
            range.insertNode(newElement);
            range.setStartAfter(newElement);
        } else {
            //but this line will ==> append to the end
            newElement.appendChild(newSelectElement);
            editableDiv.appendChild(newElement);
        }

        setHtml(editableDiv.innerHTML);

        editableDiv.focus();
    };



    const handleFnFX = () => {
        const selection = window.getSelection();
        const range = selection?.getRangeAt(0);
        const editableDiv = contentEditable.current;

        if (!editableDiv) return;

        const newElement = document.createElement('div');
        const newElement2 = document.createElement('div');
        const newElement3 = document.createElement('div');
        const newSelectElement = document.createElement('select');

        [{ fnValue: "avg", fnCaption: "میانگین()" }].forEach(item => {
            const newOptionElement = document.createElement('option');
            newOptionElement.value = item.fnValue;
            newOptionElement.textContent = item.fnCaption;
            newSelectElement.appendChild(newOptionElement);
        });



        newElement.className = `${styles.dynamicbtn} ${styles["NEW_FnFx"]}`;
        newElement.setAttribute('data-type', "NEW_FnFx")
        newElement.contentEditable = 'false';
        newElement2.contentEditable = 'false';
        newElement3.contentEditable = 'false';
        newElement2.textContent = "(";
        newElement3.textContent = ")";
        newElement2.className = `${styles.dynamicbtn} ${styles["OPERATOR"]}`;
        newElement3.className = `${styles.dynamicbtn} ${styles["OPERATOR"]}`;

        if (range && editableDiv.contains(range.startContainer)) {
            newElement.appendChild(newSelectElement);
            range.insertNode(newElement3);
            range.insertNode(newElement2);
            range.insertNode(newElement);
            range.setStartAfter(newElement3);
        } else {
            //but this line will ==> append to the end
            newElement.appendChild(newSelectElement);
            // newSelectElement.appendChild(newOptionElement);
            editableDiv.appendChild(newElement);
        }

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



    const renderValue = (selected: any) => {
        debugger
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: "#fff" }}>
                {/* <Image src="/assets/icons/svg/ic_fx.svg" alt="icon" style={{ width: 20, height: 20 }} /> */}
                rrrr  {selected}
            </Box>
        );
    };

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
                            color: "#9D2CDF",
                            borderColor: "none",
                            '&:before, &:after': {
                                border: 'none',
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                border: 'none',
                            },
                            '& .MuiSvgIcon-root': {
                                color: "#9D2CDF",
                            },
                        }}
                        displayEmpty
                        defaultValue=""
                        renderValue={(value: any) => {

                            return (
                                <Box sx={{ display: "flex", gap: 1 }}>
                                    <Image
                                        alt="file preview"
                                        src={"/assets/icons/svg/ic_fx.svg"}
                                        height={30}
                                        width={30}
                                    />
                                    {value}
                                </Box>
                            );
                        }}
                        MenuProps={{
                            PaperProps: {
                                sx: { px: 1, maxHeight: 280, minHeight: 180 },
                            },
                        }}
                        onClick={handleFnFX}
                        onOpen={() => {
                            const editableDiv = contentEditable.current;
                            editableDiv.focus();
                        }}
                    >

                        {["میانگین  ()"].map((option: any) => {

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
                    <Typography variant="subtitle2" color="#161616">{formula}</Typography>

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
                                innerRef={contentEditable}
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
                        type="button"
                        // disableRipple
                        onClick={() => {
                            const newFormula = htmlToFormula(html)
                            // console.log('newFormula :>> ', newFormula);
                            // setHtml(evt.target.value)
                            setFormula(newFormula)
                        }}
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