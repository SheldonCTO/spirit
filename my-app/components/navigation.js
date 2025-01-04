import { Container, Navbar, Nav } from "react-bootstrap";
import Link from 'next/link';
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function Navigation(props) {

  const router = useRouter();
  const [categories, setCategories] = useState({});
  const [selectedCategory, setSelectedCat] = useState(null);


  useEffect(() => {
    fetch(`http://localhost:8080/api/products`)
    .then((res) => res.json())
    .then((data) => {
      const productCategories = {};

      data.forEach((product) => {
        const { category, image } = product;

        if (!productCategories[category]) {
          productCategories[category] = image;
        }
      });

      setCategories(productCategories);
    })
    .catch((error) => {
      console.log("Error when fetching products: ", error);
    });
}, []);


const handleCategoryClick = (category) => {
  setSelectedCategory(category);
  router.push(`/products?category=${category}`);
};

  return (
    <>
    <Navbar  expand="lg" >
      <Container style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
       <div className="logoSearchAndLogin" > 
       <Image src="/logo.png" alt="logo" weight={100} height={400} />
       <form
      style={{
        marginTop: "10px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <input
        type="text"
        placeholder="搜尋..."
        style={{
          padding: "5px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      <button
        type="submit"
        style={{
          marginLeft: "5px",
          padding: "5px 10px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        搜尋
      </button>
    </form>
    
</div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="me-auto">
            <Link href="/" passHref legacyBehavior ><Nav.Link>主頁&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;</Nav.Link></Link>
            <Link href="/sales" passHref legacyBehavior><Nav.Link>購買產品&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;</Nav.Link></Link>
           
            <Link href="/payment" passHref legacyBehavior><Nav.Link>付款方式&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;</Nav.Link></Link> 
            <Link href="/location" passHref legacyBehavior><Nav.Link>合作店戶&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;</Nav.Link></Link> 
            <Link href="/contact" passHref legacyBehavior><Nav.Link>聯絡我們&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;</Nav.Link></Link>
          </Nav>
   
        </Navbar.Collapse>


   </Container>
    </Navbar>


        <Image src="/headCopy.gif" alt='header' height={auto} width={width}/>
        <br></br>
        <div style={{ maxWidth:"auto"}}>
          

          <div style={{ width:"auto", display:'flex'}}>
            {Object.entries(categories).map(([category, image]) => (
             <tr key={category.id} onClick={() => handleCategoryClick (category)}>
             <td style={{width:"105px"}}><img src={product.image} alt={product.title} style={{ width: '100px', height: 'auto' }} /></td>
         </tr>
            ))}



          </div>
      
       
      </div>
   
</>

  );
}
