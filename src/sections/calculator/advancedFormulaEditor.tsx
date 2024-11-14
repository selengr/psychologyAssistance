

import React, { useState, useRef, useEffect, KeyboardEvent, MouseEvent } from 'react';
import { Box, Typography, Paper, Stack, Input, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/system';

const EditorContainer = styled(Box)(({ theme }) => ({
    // padding: theme.spacing(2),
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%',
    position: 'relative',
    '&:focus-within': {
        // outline: `2px solid ${theme.palette.primary.main}`,
        outline: 'none',
    },
}));


const ContentArea = styled(Box)({
    minHeight: '1.5em',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    cursor: 'text',
    '&:focus': {
        outline: 'none',
    },
});

const ItemSpan = styled('span')<{ itemType: string; isSelected: boolean }>(({ theme, itemType, isSelected }) => ({
    display: 'inline-block',
    padding: '2px 4px',
    margin: '0 2px',
    borderRadius: theme.shape.borderRadius,
    backgroundColor:
        itemType === 'function' ? theme.palette.primary.light :
            itemType === 'operator' ? theme.palette.secondary.light :
                itemType === 'parentheses' ? theme.palette.success.light :
                    'transparent',
    color: theme.palette.text.primary,
    fontWeight: itemType !== 'text' ? 'bold' : 'normal',
    border: isSelected ? `2px solid ${theme.palette.primary.main}` : 'none',
}));

interface Item {
    id: number;
    type: 'text' | 'function' | 'operator' | 'parentheses';
    value: string;
}

export default function AdvancedFormulaEditor({ scriptJSON, setScriptJSON }: any) {
    const [items, setItems] = useState<Item[]>([]);
    const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.focus();
        }
    }, []);

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Backspace' && items.length > 0) {
            if (selectedItemIndex !== null) {
                removeItem(selectedItemIndex);
                setSelectedItemIndex(selectedItemIndex > 0 ? selectedItemIndex - 1 : null);
            } else {
                removeItem(items.length - 1);
            }
        } else if (event.key === 'ArrowLeft') {
            moveSelection(-1);
        } else if (event.key === 'ArrowRight') {
            moveSelection(1);
        } else if (event.key === 'ArrowUp') {
            moveSelectionVertically(-1);
        } else if (event.key === 'ArrowDown') {
            moveSelectionVertically(1);
        } else if (event.key === 'Enter') {
            event.preventDefault();
            addItem('function', 'Average()');
        } else if (['+', '-', '*', '/'].includes(event.key)) {
            event.preventDefault();
            addItem('operator', event.key);
        } else if (['(', ')'].includes(event.key)) {
            event.preventDefault();
            addItem('parentheses', event.key);
        } else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
            addItem('text', event.key);
        }
    };

    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
        const clickX = event.clientX;
        const clickY = event.clientY;
        const containerRect = contentRef.current?.getBoundingClientRect();
        if (containerRect) {
            const clickOffsetX = clickX - containerRect.left;
            const clickOffsetY = clickY - containerRect.top;
            let closestIndex = -1;
            let closestDistance = Infinity;

            items.forEach((_, index) => {
                const itemElement = contentRef.current?.children[index] as HTMLElement;
                if (itemElement) {
                    const itemRect = itemElement.getBoundingClientRect();
                    const itemCenterX = itemRect.left + itemRect.width / 2 - containerRect.left;
                    const itemCenterY = itemRect.top + itemRect.height / 2 - containerRect.top;
                    const distance = Math.sqrt(
                        Math.pow(clickOffsetX - itemCenterX, 2) + Math.pow(clickOffsetY - itemCenterY, 2)
                    );
                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestIndex = index;
                    }
                }
            });

            setSelectedItemIndex(closestIndex !== -1 ? closestIndex : null);
        }
    };

    const addItem = (type: Item['type'], value: string) => {
        const newItem = { id: Date.now(), type, value };
        if (selectedItemIndex !== null) {
            const newItems = [...items];
            newItems.splice(selectedItemIndex + 1, 0, newItem);
            setItems(newItems);
            setSelectedItemIndex(selectedItemIndex + 1);
        } else {
            setItems([...items, newItem]);
            setSelectedItemIndex(items.length);
        }
    };

    const removeItem = (index: number) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };

    const moveSelection = (direction: number) => {
        if (selectedItemIndex === null) {
            setSelectedItemIndex(direction > 0 ? 0 : items.length - 1);
        } else {
            const newIndex = selectedItemIndex + direction;
            if (newIndex >= 0 && newIndex < items.length) {
                setSelectedItemIndex(newIndex);
            }
        }
    };

    const moveSelectionVertically = (direction: number) => {
        if (contentRef.current && selectedItemIndex !== null) {
            const itemElements = Array.from(contentRef.current.children) as HTMLElement[];
            const currentItem = itemElements[selectedItemIndex];
            const currentRect = currentItem.getBoundingClientRect();
            const currentCenterX = currentRect.left + currentRect.width / 2;
            const currentCenterY = currentRect.top + currentRect.height / 2;

            let closestIndex = selectedItemIndex;
            let closestDistance = Infinity;

            itemElements.forEach((item, index) => {
                const rect = item.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                if ((direction < 0 && centerY < currentCenterY) || (direction > 0 && centerY > currentCenterY)) {
                    const distance = Math.sqrt(
                        Math.pow(centerX - currentCenterX, 2) + Math.pow(centerY - currentCenterY, 2)
                    );
                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestIndex = index;
                    }
                }
            });

            if (closestIndex !== selectedItemIndex) {
                setSelectedItemIndex(closestIndex);
            }
        }
    };

    const renderItems = () => {
        return items.map((item, index) => (
            <ItemSpan
                key={item.id}
                itemType={item.type}
                isSelected={index === selectedItemIndex}
            >
                {item.value}
            </ItemSpan>
        ));
    };

    return (
        <Box sx={{ width: '100%', height: "100%" }}>

            <EditorContainer>
                <ContentArea
                    ref={contentRef}
                    onKeyDown={handleKeyDown}
                    onClick={handleClick}
                    tabIndex={0}
                    role="textbox"
                    aria-label="Formula Editor"
                >


                    <Stack spacing={4} sx={{ width: "100%", height: "max-content", display: "flex", flexWrap: "wrap", flexDirection: "row" }}>
                        {scriptJSON.map((item: { content: number, type: string }) => {
                            if (item.type === "NUMBER") {

                                return <Input
                                    value={item.content}
                                    //  spacing={4} 

                                    sx={{
                                        height: 33,
                                        color: "#2CDFC9", backgroundColor: "#EAFCFA",
                                        fontWeight: 500,
                                        minWidth: 33,
                                        margin: "3px !important",
                                        marginTop: "0px !important",
                                        borderRadius: "6px",
                                        display: "flex", justifyContent: "center", alignItems: "center",
                                    }}


                                />
                                {/* {item.content as number}
        </Stack> */}
                            }
                            if (item.type === "OPERATOR") {

                                return <Stack spacing={4} sx={{
                                    width: 33,
                                    height: 33,
                                    color: "#1758BA", backgroundColor: "#1758BA1A",
                                    fontWeight: 500,
                                    minWidth: 33,
                                    marginRight: "3px !important",
                                    marginTop: "0px !important",
                                    borderRadius: "6px",
                                    display: "flex", justifyContent: "center", alignItems: "center",
                                }}
                                >
                                    {item.content as number}
                                </Stack>
                            }
                            if (item.type === "NEW_FIELD") {

                                return <Select
                                    sx={{
                                        '& .MuiSelect-select': {
                                            padding: 1,
                                        },
                                        marginRight: "3px !important",
                                        marginTop: "0px !important",
                                        width: 145,
                                        height: 33,
                                        fontWeight: 500,
                                        backgroundColor: "#1758BA1A",
                                        borderColor: "none",
                                        '&:before, &:after': {
                                            border: 'none',
                                        },
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            border: 'none',
                                        },
                                    }}

                                    MenuProps={{
                                        PaperProps: {
                                            sx: { px: 1, maxHeight: 280, minHeight: 180 },
                                        },
                                    }}

                                >

                                    {["میانگین   ()"].map((option: any) => {
                                        return (
                                            <MenuItem
                                                key={option.value}
                                                value={option.value}
                                                sx={{
                                                    py: 1,
                                                    px: 2,
                                                    height: 33,
                                                    borderRadius: 1.75,
                                                    typography: 'body2',
                                                    backgroundColor: "#1758BA !important",
                                                    color: "white",
                                                    margin: "5px",

                                                }}
                                            >
                                                {/* {checkbox && <Checkbox disableRipple size="small" checked={selected} />} */}

                                                {option}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            }
                            if (item.type === "AVG") {

                                return <Select
                                    sx={{
                                        '& .MuiSelect-select': {
                                            padding: 1,
                                        },
                                        marginRight: "3px !important",
                                        marginTop: "0px !important",
                                        width: 145,
                                        height: 33,
                                        fontWeight: 500,
                                        color: "white",
                                        backgroundColor: "#9D2CDF",
                                        borderColor: "none",
                                        '&:before, &:after': {
                                            border: 'none',
                                        },
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            border: 'none',
                                        },
                                    }}

                                    MenuProps={{
                                        PaperProps: {
                                            sx: { px: 1, maxHeight: 280, minHeight: 180 },
                                        },
                                    }}
                                    value={"میانگین   ()"}

                                >

                                    {["میانگین   ()"].map((option: any) => {
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

                                                }}
                                            >
                                                {/* {checkbox && <Checkbox disableRipple size="small" checked={selected} />} */}

                                                {option}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            }
                            return <Typography variant="subtitle1" sx={{ display: "flex", justifyContent: "center", color: "#404040", fontWeight: 500 }}>{item.content}</Typography>
                        })}

                    </Stack>
                </ContentArea>
            </EditorContainer>
        </Box>
    );
}





// <Stack spacing={4} sx={{ width: "100%", height: "max-content", display: "flex", flexWrap: "wrap", flexDirection: "row" }}>
// {scriptJSON.map((item: { content: number, type: string }) => {
//     if (item.type === "NUMBER") {

//         return <Input
//             value={item.content}
//             //  spacing={4} 

//             sx={{
//                 height: 33,
//                 color: "#2CDFC9", backgroundColor: "#EAFCFA",
//                 fontWeight: 500,
//                 minWidth: 33,
//                 margin: "3px !important",
//                 marginTop: "0px !important",
//                 borderRadius: "6px",
//                 display: "flex", justifyContent: "center", alignItems: "center",
//             }}


//         />
//         {/* {item.content as number}
//         </Stack> */}
//     }
//     if (item.type === "OPERATOR") {

//         return <Stack spacing={4} sx={{
//             width: 33,
//             height: 33,
//             color: "#1758BA", backgroundColor: "#1758BA1A",
//             fontWeight: 500,
//             minWidth: 33,
//             marginRight: "3px !important",
//             marginTop: "0px !important",
//             borderRadius: "6px",
//             display: "flex", justifyContent: "center", alignItems: "center",
//         }}
//         >
//             {item.content as number}
//         </Stack>
//     }
//     if (item.type === "NEW_FIELD") {

//         return <Select
//             sx={{
//                 '& .MuiSelect-select': {
//                     padding: 1,
//                 },
//                 marginRight: "3px !important",
//                 marginTop: "0px !important",
//                 width: 145,
//                 height: 33,
//                 fontWeight: 500,
//                 backgroundColor: "#1758BA1A",
//                 borderColor: "none",
//                 '&:before, &:after': {
//                     border: 'none',
//                 },
//                 '& .MuiOutlinedInput-notchedOutline': {
//                     border: 'none',
//                 },
//             }}

//             MenuProps={{
//                 PaperProps: {
//                     sx: { px: 1, maxHeight: 280, minHeight: 180 },
//                 },
//             }}

//         >

//             {["میانگین   ()"].map((option: any) => {
//                 return (
//                     <MenuItem
//                         key={option.value}
//                         value={option.value}
//                         sx={{
//                             py: 1,
//                             px: 2,
//                             height: 33,
//                             borderRadius: 1.75,
//                             typography: 'body2',
//                             backgroundColor: "#1758BA !important",
//                             color: "white",
//                             margin: "5px",

//                         }}
//                     >
//                         {/* {checkbox && <Checkbox disableRipple size="small" checked={selected} />} */}

//                         {option}
//                     </MenuItem>
//                 );
//             })}
//         </Select>
//     }
//     if (item.type === "AVG") {

//         return <Select
//             sx={{
//                 '& .MuiSelect-select': {
//                     padding: 1,
//                 },
//                 marginRight: "3px !important",
//                 marginTop: "0px !important",
//                 width: 145,
//                 height: 33,
//                 fontWeight: 500,
//                 color: "white",
//                 backgroundColor: "#9D2CDF",
//                 borderColor: "none",
//                 '&:before, &:after': {
//                     border: 'none',
//                 },
//                 '& .MuiOutlinedInput-notchedOutline': {
//                     border: 'none',
//                 },
//             }}

//             MenuProps={{
//                 PaperProps: {
//                     sx: { px: 1, maxHeight: 280, minHeight: 180 },
//                 },
//             }}
//             value={"میانگین   ()"}

//         >

//             {["میانگین   ()"].map((option: any) => {
//                 return (
//                     <MenuItem
//                         key={option}
//                         value={option}
//                         sx={{
//                             py: 1,
//                             px: 2,
//                             height: 33,
//                             borderRadius: 1.75,
//                             typography: 'body2',
//                             backgroundColor: "#9D2CDF !important",
//                             color: "white",
//                             margin: "5px",

//                         }}
//                     >
//                         {/* {checkbox && <Checkbox disableRipple size="small" checked={selected} />} */}

//                         {option}
//                     </MenuItem>
//                 );
//             })}
//         </Select>
//     }
//     return <Typography variant="subtitle1" sx={{ display: "flex", justifyContent: "center", color: "#404040", fontWeight: 500 }}>{item.content}</Typography>
// })}

// </Stack>