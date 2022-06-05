import React, { useEffect, useState } from "react";
import { Box, Text, VStack, Button, HStack } from "native-base";
import dateFormat from "dateformat";
import axios from "axios";

const ListPaid = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.kontenbase.com/query/api/v1/940aa1de-d88b-4d99-adab-4d337c7ed1ff/hutang?status=lunas`
      )
      .then((res) => setData(res.data));
  }, []);

  const handleDelete = (id) => {
    // setIdUpdate(id);
    const sendDeleteRequest = async () => {
        try {
            const resp = await axios.delete(`https://api.kontenbase.com/query/api/v1/940aa1de-d88b-4d99-adab-4d337c7ed1ff/hutang/${id}`)
            console.log(resp.data);
            if (resp) {
              location.reload();
            }
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    sendDeleteRequest();
  };

  return (
    <Box safeArea bg="primary.200" flex={1} px={5} w="100%" mx="auto">
      {data.map((item, index) => (
        <HStack key={index} space={2} bg="gray.400" p="3" my={3} rounded={5}>
          <VStack flex={3}>
            <Text fontSize="md" fontWeight="bold">
              {item.nama_hutang}
            </Text>
            <Text>{item.jumlah}</Text>
          </VStack>
          <VStack flex={2}>
            <Button
              bg="gray.400"
              borderColor="white"
              borderWidth={1}
              disabled="disabled"
              _text={{ fontWeight: "black", fontSize: "sm" }}
            >
              {item.status}
            </Button>
          </VStack>
          <VStack flex={3}>
            <Button
              bg="danger.400"
              _text={{ fontWeight: "black", fontSize: "sm" }}
              onPress={()=>{
                handleDelete(item._id);
               }}
            >
              Hapus
            </Button>
            <Text
              fontSize={10}
              mt="3"
              pr="2"
              textAlign="right"
              fontStyle="italic"
            >
              Paid At:{" "}
                {dateFormat(item.tanggal_lunas, "dddd, mmmm dS, yyyy, h:MM:ss TT")}
            </Text>
          </VStack>
        </HStack>
      ))}
    </Box>
  );
};

export default ListPaid;
