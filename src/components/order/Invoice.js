import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { Table, TableHeader, TableCell, TableBody, DataTableCell  } from "@david.kucsai/react-pdf-table";

const Invoice = ({order}) => {

  const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
      border: "1px solid red",
    },
    title: {
      fontSize: 24,
      textAlign: "center",
    },
    table: {
      paddingTop : 30,
    },
    author: {
      fontSize: 12,
      textAlign: "center",
      marginBottom: 40,
    },
    subtitle: {
      fontSize: 18,
      margin: 12,
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: "justify",
      color: "red",
    },
    image: {
      marginVertical: 15,
      marginHorizontal: 100,
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: "center",
      color: "grey",
    },
    footer: {
      padding: "100px",
      fontSize: 12,
      marginBottom: 20,
      textAlign: "center",
      color: "grey",
    },
    pageNumber: {
      position: "absolute",
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: "center",
      color: "grey",
    },
  });
  return (

    <Document>
      <Page size="A4" style={styles.body}>
        <Text style={styles.title}>Invoice</Text>
        <Table
          data={order.products}
          style={styles.title}
        >
            <TableHeader>
                <TableCell>
                    Item Name
                </TableCell>
                <TableCell>
                  Color
                </TableCell>
                <TableCell>
                  Quantity 
                </TableCell>
                <TableCell>
                  Unit Price
                </TableCell>
                <TableCell>
                  Price
                </TableCell>
            </TableHeader>
            <TableBody>
                <DataTableCell getContent={(r) => r.product.title}/>
                <DataTableCell getContent={(r) => r.color}/>
                <DataTableCell getContent={(r) => r.count}/>
                <DataTableCell getContent={(r) => `$${r.product.price}`}/>    
                <DataTableCell getContent={(r) => `$${r.product.price*r.count}`}/>    
            </TableBody>
        </Table>
        
      </Page>
    </Document>  
  );
}




export default Invoice;
