import React, { useEffect, useState } from "react";
import { Box, Text, VStack, Button, HStack } from "native-base";
import dateFormat from "dateformat";
import axios from "axios";

const ListDebt = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(
          `https://api.kontenbase.com/query/api/v1/940aa1de-d88b-4d99-adab-4d337c7ed1ff/hutang?status=hutang`
        )
        .then((res) => setData(res.data));
    };

    getData();
  }, []);

  const handleLunas = (id) => {
    // setIdUpdate(id);

    const lunasById = async () => {
      try {
       const updateLunas = await axios
          .patch(
            `https://api.kontenbase.com/query/api/v1/940aa1de-d88b-4d99-adab-4d337c7ed1ff/hutang/${id}`,{
            status: "lunas"
            }
          )
        if (updateLunas) {
          location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    };
    lunasById();
  };

  return (
    <>
      <Box safeArea bg="primary.200" px={5} w="100%" h="100%" mx="auto">
        {data.map((item, index) => (
          <HStack key={index} bg="primary.500" p="3" my={3} rounded={5}>
            <VStack flex={3}>
              <Text fontSize="md" fontWeight="bold">
                {item.nama_hutang}
              </Text>
              <Text>Rp.{item.jumlah}</Text>
            </VStack>
            <VStack flex={1}>
              <Button
                bg="danger.400"
                _text={{ fontWeight: "black", fontSize: "sm" }}
                onPress={() => {
                  handleLunas(item._id);
                }}
              >
                Bayar
              </Button>
              <Text fontSize={10} mt="3" textAlign="left" fontStyle="italic">
                Created At:{" "}
                {dateFormat(item.tanggal_hutang, "dddd, mmmm dS, yyyy, h:MM:ss TT")}
              </Text>
            </VStack>
          </HStack>
        ))}
      </Box>
    </>
  );
};

export default ListDebt;
