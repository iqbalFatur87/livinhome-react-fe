import {
  HStack,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
} from "@chakra-ui/react";
import {
  backgroundContainer,
  customBorder,
  borderRadius,
  primaryColor,
  primaryTextColor,
  secondaryTextColor,
} from "./theme";

const TableCompo = (props: {
  tableName: String;
  description?: String;
  columns: any;
  data: any;
  currentLimit?: any;
  setCurrentPage?: any;
  setCurrentlimit?: any;
  additionalComponent?: any;
}) => {
  return props.data.data ? (
    <Stack
      maxWidth={"1440px"}
      width={{ base: "100vw", md: "100%" }}
      marginX={"auto"}
      marginBottom={"20px"}
      padding={"5px"}
      borderRadius={borderRadius()}
      backgroundColor={backgroundContainer()}
      border={customBorder()}
    >
      <HStack
        justifyContent={"space-between"}
        flexWrap={"wrap"}
        padding={"20px"}
      >
        <Stack lineHeight={"1"}>
          <Text fontSize={"2xl"} color={primaryColor()} as={"b"}>
            {props.tableName}
          </Text>
          <Text color={secondaryTextColor()} fontSize={"12px"}>
            {props.description}
          </Text>
        </Stack>
        {props.additionalComponent}
      </HStack>
      <Stack overflowX={"scroll"}>
        <Table>
          <Thead color={secondaryTextColor()} fontSize={"md"}>
            <Tr border={"none"}>
              {props.columns.map((cel: any, index: number) => (
                <Td
                  borderBottom={customBorder()}
                  key={index}
                  isNumeric={cel?.align === "right" ? true : false}
                >
                  {cel.title}
                </Td>
              ))}
            </Tr>
          </Thead>
          <Tbody color={primaryTextColor()} fontSize={"md"}>
            {props.data.data.map((row: any, index: number) => (
              <Tr key={index}>
                {props.columns.map((column: any, index: number) => (
                  <Td
                    border={"none"}
                    key={index}
                    isNumeric={column?.align === "right" ? true : false}
                    whiteSpace={"nowrap"}
                  >
                    {column.render ? column?.render(row) : row[column.key]}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Stack>

      {/* //pagination 
      {props.currentLimit < props.data.totalItems ? (
        <HStack justifyContent={"flex-end"} my={"20px"}>
          {props.data.prevPage != 1 && props.data.prevPage !== 0 ? (
            <>
              {props.data.prevPage - 1 > 1 ? (
                <Button
                  size={"sm"}
                  variant={"outline"}
                  onClick={() => props.setCurrentPage(props.data.prevPage)}
                >
                  <IoIosArrowBack />
                </Button>
              ) : null}
              <Button
                size={"sm"}
                variant={"outline"}
                onClick={() => props.setCurrentPage(1)}
              >
                1
              </Button>
              {props.data.prevPage - 1 !== 1 ? (
                <Button size={"sm"} variant={"outline"}>
                  ...
                </Button>
              ) : null}
            </>
          ) : null}

          {props.data.prevPage != 0 ? (
            <Button
              size={"sm"}
              variant={"outline"}
              onClick={() => props.setCurrentPage(props.data.prevPage)}
            >
              {props.data.prevPage}
            </Button>
          ) : null}

          <Button
            size={"sm"}
            variant={"solid"}
            onClick={() => props.setCurrentPage(props.data.currentPage)}
          >
            {props.data.currentPage}
          </Button>
          {props.data.nextPage !== 0 ? (
            <Button
              size={"sm"}
              variant={"outline"}
              onClick={() => props.setCurrentPage(props.data.nextPage)}
            >
              {props.data.nextPage}
            </Button>
          ) : null}

          {props.data.nextPage != props.data.totalPages &&
          props.data.nextPage !== 0 ? (
            <>
              {props.data.nextPage + 1 !== props.data.totalPages ? (
                <Button size={"sm"} variant={"outline"}>
                  ...
                </Button>
              ) : null}

              <Button
                size={"sm"}
                variant={"outline"}
                onClick={() => props.setCurrentPage(props.data.totalPages)}
              >
                {props.data.totalPages}
              </Button>
              {props.data.totalPages - props.data.nextPage > 1 ? (
                <Button
                  size={"sm"}
                  variant={"outline"}
                  onClick={() => props.setCurrentPage(props.data.nextPage)}
                >
                  <IoIosArrowForward />
                </Button>
              ) : null}
            </>
          ) : null}

          <Stack>
            <Select
              value={props.currentLimit}
              onChange={(e) => {
                props.setCurrentlimit(e.target.value);
                props.setCurrentPage(1);
              }}
              backgroundColor={inputBackgroundColor()}
              border={customBorder()}
              color={inputColor()}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </Select>
          </Stack>
        </HStack>
      ) : null} */}
    </Stack>
  ) : null;
};

export default TableCompo;
