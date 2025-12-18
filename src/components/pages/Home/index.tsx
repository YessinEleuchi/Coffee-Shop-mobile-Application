import React, { useState } from "react";
import { View } from "react-native";
import { profile, search, filter } from "../../../assets";
import { HomeHeader, SearchBar } from "../../molecules";
import {AppText} from "../../atoms";

const Home: React.FC = () => {
    const [q, setQ] = useState("");

    return (
        <View style={{ flex: 1 }}>
            <HomeHeader avatar={profile} location="Sfax, Tunisia" />
            <AppText variant={"body"} style={{marginHorizontal:30,
            marginTop:15 , fontWeight:"bold"}}>
                Good Morning, Yessine
            </AppText>

            <View style={{ marginTop: 16 }}>
                <SearchBar
                    value={q}
                    onChangeText={setQ}
                    placeholder="Search Coffee..."
                    leftIcon={search}
                    rightIcon={filter}
                    onPressFilter={() => console.log("filter")}
                />
            </View>
        </View>
    );
};

export default Home;
