import { Breadcrumb } from 'antd';
import React from 'react'
import { IoIosArrowForward } from 'react-icons/io';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';


const CrumbStyled = styled.div`
  display: inline-flex;
  margin-right: 10px;

  & :after {
    margin-left: 10px;
  }

  a {
    color: var(--white);
    text-decoration: none;
  }
  .crumb {
    margin-right: 10px;
  }
  .crumb:after {
    content: ">";
    magin-left: 10px;
    color: var(--orange);
  }
  .crumb:last-child:after {
    display: none;
  }
`

// function Breadcrumbs() {
//   const location = useLocation();

//   // path = home/dashboard => home | dashboard
//   let currentPath: string = ''
//   const crumbs = location.pathname.split('/')
//     .filter(crumb => crumb !== '')
//     .map(crumb => {
//       currentPath += `/${crumb}`

//       return <div key={crumb} className='crumb'>
//           <Link to={currentPath}>{crumb}</Link>
//       </div>
//     })

//     console.log(crumbs)

//   return (
//     <CrumbStyled>
//       {crumbs}
//     </CrumbStyled>
//   )
// }
const BreadcrumbStyled = styled(Breadcrumb)`
  &&& {
    .ant-breadcrumb-link {
      color: var(--white);
      font-size:  16px;
    }
    .ant-breadcrumb-separator {
      color: var(--orange);
    }
    
  }
  a {
    color: var(--white);
    font-size: 16px;

    :hover {
      color: var(--white);
      text-decoration: underline;
    }
  }
`

function Breadcrumbs() {

  const location = useLocation();

  // path = home/dashboard => home | dashboard
  let currentPath: string = ''
  const crumbs = location.pathname.split('/')
    .filter(crumb => crumb !== '')
    .map(crumb => {
      currentPath += `/${crumb}`

      return <Breadcrumb.Item key={crumb} >
        <Link to={currentPath}>{crumb}</Link>
      </Breadcrumb.Item>
      
    })

    return(
       <nav> 
          <BreadcrumbStyled separator={<IoIosArrowForward />}>
            {crumbs}
          </BreadcrumbStyled>
        </nav>
    )
}

export default Breadcrumbs