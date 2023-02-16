import React from "react";
import { Pressable, StyleProp, Text, TextStyle } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type Props = {
    numOfLines: number
    value: string
    style?: StyleProp<TextStyle>
}

function ExpandableText(props: Props) {

    const {numOfLines, value, style} = props
    const [expanded, setExpanded] = React.useState(false)

    const toggleExpanded = ()=>{
        setExpanded((current) => !current)
    }
    return (
        <Pressable onPress={toggleExpanded}>
            <Text style={style} numberOfLines={expanded ? 0 : numOfLines}>{value}</Text>
            <Icon name={expanded ? "chevron-up" : "chevron-down"} size={25} style={{ alignSelf: "center" }} />
        </Pressable>
    )
}

export default ExpandableText