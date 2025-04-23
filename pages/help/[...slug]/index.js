export async function getStaticPaths() {
    const slugs = ['faqs', 'contact', 'privacy'];
    
    const paths = slugs.map((slug) => ({ 
        params: {slug: [slug]} 
    }));
    
    return { paths, fallback: false };
  }
  
export async function getStaticProps({ params }) {
    const slug = params.slug[0];
    
    return {
      props: { slug },
      revalidate: 60
    };
}
  
export default function HelpPage({ slug }) {
    switch (slug) {
      case 'faqs':
        return <div>Frequently Asked Questions</div>;
      case 'contact':
        return <div>Contact Us</div>;
      case 'privacy':
        return <div>Privacy Policy</div>;
      default:
        return <div>404: Help section not found</div>;
    }
}
  