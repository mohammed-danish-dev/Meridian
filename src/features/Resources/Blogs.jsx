import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Button, OutlinedInput, InputAdornment, Chip, useTheme, alpha, Breadcrumbs, Link } from '@mui/material';
import { Search, CalendarToday, AccessTime, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useHomeNavigation } from '../../hooks/useHomeNavigation';

export const blogPosts = [
  {
    id: '1',
    title: 'The Future of Enterprise Governance in a Decentralized World',
    category: 'Enterprise Governance',
    description: 'Explore how decentralized autonomous organizations (DAOs) and blockchain are reshaping traditional enterprise governance models.',
    author: 'Dr. Sarah Jenkins',
    date: 'Oct 12, 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200&h=600',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    id: '2',
    title: 'Next-Gen Procurement: AI-Driven Sourcing Strategies',
    category: 'Procurement Management',
    description: 'How artificial intelligence is automating supplier selection, negotiating contracts, and optimizing the entire procurement lifecycle.',
    author: 'Michael Chang',
    date: 'Oct 05, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200&h=600',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    id: '3',
    title: 'Navigating Third-Party Vendor Risks in 2027',
    category: 'Vendor Risk',
    description: 'A comprehensive guide to identifying and mitigating risks associated with third-party and fourth-party vendors in complex supply chains.',
    author: 'Elena Rodriguez',
    date: 'Sep 28, 2026',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200&h=600',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    id: '4',
    title: 'Continuous Compliance: Moving Beyond Annual Audits',
    category: 'Compliance',
    description: 'Why real-time compliance monitoring is essential for modern enterprises facing rapidly changing global regulatory environments.',
    author: 'David Thorne',
    date: 'Sep 15, 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200&h=600',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    id: '5',
    title: 'Transforming Internal Audits with Big Data Analytics',
    category: 'Analytics',
    description: 'Discover how data analytics and machine learning are revolutionizing the internal audit function, providing unprecedented insights and efficiency.',
    author: 'Amanda Clark',
    date: 'Sep 02, 2026',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200&h=600',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    id: '6',
    title: 'Building a Resilient Enterprise Security Architecture',
    category: 'Enterprise Security',
    description: 'Key principles and frameworks for designing a robust security architecture that protects critical assets against sophisticated cyber threats.',
    author: 'Marcus Johnson',
    date: 'Aug 20, 2026',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200&h=600',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    id: '7',
    title: 'Workflow Automation: The Engine of Digital Transformation',
    category: 'Workflow Automation',
    description: 'How implementing intelligent workflow automation can dramatically reduce operational friction and accelerate business outcomes.',
    author: 'Sophia Lee',
    date: 'Aug 11, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200&h=600',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    id: '8',
    title: 'Best Practices for Implementing a unified GRC Platform',
    category: 'Best Practices',
    description: 'A step-by-step guide to successfully deploying and adopting a unified Governance, Risk, and Compliance (GRC) platform across your enterprise.',
    author: 'James Wilson',
    date: 'Jul 29, 2026',
    readTime: '15 min read',
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?auto=format&fit=crop&q=80&w=1200&h=600',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  }
];

const categories = ['All', 'Enterprise Governance', 'Procurement Management', 'Vendor Risk', 'Compliance', 'Analytics', 'Enterprise Security', 'Workflow Automation', 'Best Practices'];

const Blogs = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const navigateToHome = useHomeNavigation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(5);

  const featuredBlog = blogPosts[0];
  const remainingBlogs = blogPosts.slice(1);

  const filteredBlogs = remainingBlogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || blog.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 10 }}>
<Box sx={{ bgcolor: theme.palette.mode === 'light' ? '#FFFFFF' : '#0B0F19', pt: 4, pb: 8, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Container maxWidth="xl">
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
            <Button startIcon={<ArrowBack />} onClick={navigateToHome} color="inherit" sx={{ mr: 2 }}>Back to Home</Button>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" onClick={navigateToHome} sx={{ cursor: 'pointer' }}>Home</Link>
              <Typography color="text.primary">Blogs</Typography>
            </Breadcrumbs>
          </Box>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>Enterprise Insights & Blogs</Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 'md', mb: 6 }}>
            Stay updated with the latest trends, strategies, and best practices in enterprise governance, risk management, and compliance.
          </Typography>
<Grid container spacing={3} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <OutlinedInput
                fullWidth
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                }
                sx={{ bgcolor: theme.palette.mode === 'light' ? '#F8FAFC' : '#1E293B', borderRadius: 1 }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: 1, '&::-webkit-scrollbar': { height: 6 }, '&::-webkit-scrollbar-thumb': { bgcolor: theme.palette.divider, borderRadius: 3 } }}>
                {categories.map(cat => (
                  <Chip
                    key={cat}
                    label={cat}
                    onClick={() => setSelectedCategory(cat)}
                    color={selectedCategory === cat ? 'primary' : 'default'}
                    variant={selectedCategory === cat ? 'filled' : 'outlined'}
                    sx={{ fontWeight: 600, borderRadius: 2 }}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ mt: -4 }}>
{selectedCategory === 'All' && searchTerm === '' && (
          <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, mb: 8, overflow: 'hidden', border: `1px solid ${theme.palette.divider}`, boxShadow: theme.shadows[4], borderRadius: 4, bgcolor: 'background.paper' }}>
            <CardMedia
              component="img"
              sx={{ width: { xs: '100%', md: '60%' }, height: { xs: 300, md: 450 }, objectFit: 'cover' }}
              image={featuredBlog.image}
              alt={featuredBlog.title}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', p: { xs: 4, md: 6 }, width: { xs: '100%', md: '40%' } }}>
              <Chip label={featuredBlog.category} color="primary" size="small" sx={{ alignSelf: 'flex-start', mb: 2, fontWeight: 600, borderRadius: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, lineHeight: 1.2 }}>{featuredBlog.title}</Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>{featuredBlog.description}</Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{featuredBlog.author}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary', mt: 0.5 }}>
                    <CalendarToday sx={{ fontSize: 14 }} />
                    <Typography variant="caption">{featuredBlog.date}</Typography>
                    <Typography variant="caption">•</Typography>
                    <AccessTime sx={{ fontSize: 14 }} />
                    <Typography variant="caption">{featuredBlog.readTime}</Typography>
                  </Box>
                </Box>
              </Box>
              
              <Button variant="contained" size="large" onClick={() => navigate(`/blogs/${featuredBlog.id}`)} sx={{ alignSelf: 'flex-start', px: 4, py: 1.5 }}>
                Read Article
              </Button>
            </Box>
          </Card>
        )}
<Typography variant="h5" sx={{ fontWeight: 700, mb: 4 }}>{selectedCategory === 'All' && searchTerm === '' ? 'Latest Articles' : 'Search Results'}</Typography>
        
        {filteredBlogs.length > 0 ? (
          <Grid container spacing={4}>
            {filteredBlogs.slice(0, visibleCount).map((blog) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={blog.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', border: `1px solid ${theme.palette.divider}`, boxShadow: 'none', borderRadius: 3, '&:hover': { boxShadow: theme.shadows[4], transform: 'translateY(-4px)' }, transition: 'all 0.3s ease' }}>
                  <CardMedia
                    component="img"
                    height="240"
                    image={blog.image}
                    alt={blog.title}
                  />
                  <CardContent sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
                    <Chip label={blog.category} size="small" sx={{ alignSelf: 'flex-start', mb: 2, fontWeight: 600, borderRadius: 1, bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main }} />
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, lineHeight: 1.3 }}>{blog.title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3, flexGrow: 1 }}>
                      {blog.description}
                    </Typography>
                    
                    <Box sx={{ mt: 'auto' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{blog.author}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                          <Typography variant="caption">{blog.date}</Typography>
                          <Typography variant="caption">•</Typography>
                          <Typography variant="caption">{blog.readTime}</Typography>
                        </Box>
                      </Box>
                      <Button variant="outlined" fullWidth onClick={() => navigate(`/blogs/${blog.id}`)} sx={{ borderRadius: 2 }}>
                        Read More
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">No articles found matching your criteria.</Typography>
            <Button variant="text" onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }} sx={{ mt: 2 }}>Clear Filters</Button>
          </Box>
        )}
{filteredBlogs.length > visibleCount && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
            <Button variant="contained" color="secondary" onClick={() => setVisibleCount(prev => prev + 6)} sx={{ px: 4, py: 1.5, borderRadius: 2 }}>
              Load More Articles
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Blogs;
