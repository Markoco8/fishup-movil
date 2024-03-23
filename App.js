import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { db } from "./config";
import { set, ref, onValue } from "firebase/database";

export default function App() {
  //////////// Funcion para obtener datos de temp y ph/////////////////////
  const [ph, setPh] = useState("");
  const [temp, setTemp] = useState("");

  useEffect(() => {
    const obtenerPh = ref(db, "test/TDS");
    const obtenerTemp = ref(db, "test/temp");

    const getDataph = onValue(obtenerPh, (snapshot) => {
      const data = snapshot.val();
      setPh(data);
      console.log(ph);
    });
    const getDatatemp = onValue(obtenerTemp, (snapshot) => {
      const data = snapshot.val();
      setTemp(data);
      console.log(ph);
    });
    const starCountRef = ref(db, "test/led");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setValorsito(data);
    });
    // Devuelve una función de limpieza que se ejecutará cuando el componente se desmonte
    return () => {
      getDataph();
      getDatatemp(); // Detiene la escucha de cambios en la referencia
    };
  }, []); // El array vacío asegura que se ejecute solo una vez, cuando el componente se monta

  /////////////////////////////////
  const [valorsito, setValorsito] = useState("");
  const [disabled, setDisabled] = useState(false);

  let valorAlimentarT = true;
  let valorAlimentarF = false;

  const alimentar = () => {
    set(ref(db, "test/Servo"), valorAlimentarT);
    setDisabled(true);

    // Reactivar TouchableOpacity después de 1 segundo
    setTimeout(() => {
      setDisabled(false);
      set(ref(db, "test/Servo"), valorAlimentarF);
    }, 800);
  };

  let valor = true;
  const PrenderLed = () => {
    if (valor == true) {
      set(ref(db, "test/led"), "Encender");

      valor = false;
    } else if (valor == false) {
      set(ref(db, "test/led"), "Apagar");

      valor = true;
    }
    //Para poner datos
    set(ref(db, "test/bool"), valor);
    //
    // para agarrar datos
    const starCountRef = ref(db, "test/led");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setValorsito(data);
    });

    /////////////////

    console.log(valorsito);
  };
  return (
    <>
      <ScrollView className=" bg-neutral-800">
        <LinearGradient
          colors={["#059669", "#262626"]}
          className="h-56 px-8"
          children={<View></View>}
        />
        <View className="px-8">
          <View className="flex flex-col -mt-28 justify-center items-center">
            <View className="flex flex-row">
              <Text className="text-3xl text-blue-400 font-bold">Fish Up</Text>
            </View>
            <Image
              source={require("./assets/logo_fishup.png")}
              className="rounded-full"
              style={{ width: 142, height: 142 }}
            />
          </View>

          {/* card horizontal */}
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View className="flex-col bg-neutral-600 mt-6 p-4 rounded-3xl mr-4 w-64">
              <View>
                <Text className="text-2xl text-emerald-600 mb-2 font-semibold text-center">
                  Ph
                </Text>
                <Text className="text-lg text-neutral-50 font-bold ml-2 mb-2  text-center">
                  {ph}
                </Text>
              </View>
            </View>
            <View className="flex-col bg-neutral-600 p-4 rounded-3xl mt-6 w-64">
              <View>
                <Text className="text-2xl text-emerald-600  mb-2 font-semibold  text-center">
                  Temperatura
                </Text>
                <Text className="text-lg text-neutral-50 font-bold ml-2 mb-2  text-center">
                  {temp} grados{" "}
                </Text>
              </View>
            </View>
          </ScrollView>
          {/* end card horizontal */}

          {/* buttons */}
          <View className="flex-row gap-2 mt-10">
            <LinearGradient
              colors={["#059669", "#262626"]}
              className="rounded-xl p-3 flex-1"
              children={
                <TouchableOpacity onPress={PrenderLed}>
                  <Text className="p-1 text-center text-neutral-50">
                    {valorsito}
                  </Text>
                </TouchableOpacity>
              }
            />
            <LinearGradient
              colors={["#059669", "#262626"]}
              className="rounded-xl p-3 flex-1"
              children={
                <TouchableOpacity onPress={alimentar} disabled={disabled}>
                  <Text className="p-1 text-center text-neutral-50">
                    Alimentar
                  </Text>
                </TouchableOpacity>
              }
            />
          </View>
          <View>
            <Text className="text-neutral-100">fishup</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
