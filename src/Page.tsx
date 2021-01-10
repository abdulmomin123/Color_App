import React from 'react';
import './styles/Page.css';

const Page: React.FC = ({ children }) => (
  <section className="page">{children}</section>
);

export default Page;
