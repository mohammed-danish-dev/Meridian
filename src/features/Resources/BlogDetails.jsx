import React, { useEffect } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Button, Chip, useTheme, alpha, Breadcrumbs, Link, Divider, Avatar } from '@mui/material';
import { CalendarToday, AccessTime, ArrowBack, Share, BookmarkBorder } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { blogPosts } from './Blogs';
import { useHomeNavigation } from '../../hooks/useHomeNavigation';

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const navigateToHome = useHomeNavigation();
  const theme = useTheme();

  const blog = blogPosts.find(b => b.id === id);
  const relatedBlogs = blogPosts.filter(b => b.id !== id && b.category === blog?.category).slice(0, 3);
  
  if (relatedBlogs.length < 3) {
      const moreBlogs = blogPosts.filter(b => b.id !== id && !relatedBlogs.includes(b)).slice(0, 3 - relatedBlogs.length);
      relatedBlogs.push(...moreBlogs);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!blog) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <Typography variant="h4" sx={{ mb: 2 }}>Blog not found</Typography>
        <Button variant="contained" onClick={() => navigate('/blogs')}>Return to Blogs</Button>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 10 }}>
<Box sx={{ bgcolor: theme.palette.mode === 'light' ? '#FFFFFF' : '#0B0F19', pt: 4, pb: 8, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Container maxWidth="md">
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
            <Button startIcon={<ArrowBack />} onClick={() => navigate('/blogs')} color="inherit" sx={{ mr: 2 }}>Back to Blogs</Button>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" onClick={navigateToHome} sx={{ cursor: 'pointer' }}>Home</Link>
              <Link underline="hover" color="inherit" onClick={() => navigate('/blogs')} sx={{ cursor: 'pointer' }}>Blogs</Link>
              <Typography color="text.primary" sx={{ maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{blog.title}</Typography>
            </Breadcrumbs>
          </Box>
          
          <Chip label={blog.category} color="primary" sx={{ mb: 3, fontWeight: 600, borderRadius: 1 }} />
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 4, lineHeight: 1.2, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>{blog.title}</Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 48, height: 48 }}>{blog.author.charAt(0)}</Avatar>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{blog.author}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                  <CalendarToday sx={{ fontSize: 14 }} />
                  <Typography variant="caption">{blog.date}</Typography>
                  <Typography variant="caption">•</Typography>
                  <AccessTime sx={{ fontSize: 14 }} />
                  <Typography variant="caption">{blog.readTime}</Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button variant="outlined" startIcon={<Share />} size="small">Share</Button>
              <Button variant="outlined" startIcon={<BookmarkBorder />} size="small">Save</Button>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ mt: -6 }}>
        <Card sx={{ borderRadius: 4, overflow: 'hidden', border: `1px solid ${theme.palette.divider}`, boxShadow: theme.shadows[4], mb: 8 }}>
          <CardMedia
            component="img"
            height="500"
            image={blog.image}
            alt={blog.title}
          />
        </Card>
<Box sx={{ typography: 'body1', lineHeight: 1.8, fontSize: '1.1rem', color: 'text.primary', '& p': { mb: 3 } }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>Introduction</Typography>
          <Typography sx={{ mb: 2 }}>{blog.content}</Typography>
          
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, mt: 5 }}>The Core Challenge</Typography>
          <Typography sx={{ mb: 2 }}>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
          </Typography>
          
          <Box sx={{ my: 6, p: 4, bgcolor: alpha(theme.palette.primary.main, 0.05), borderLeft: `4px solid ${theme.palette.primary.main}`, borderRadius: '0 8px 8px 0' }}>
            <Typography variant="h6" sx={{ fontStyle: 'italic', fontWeight: 600, color: 'text.primary' }}>
              "The ability to adapt quickly and maintain robust governance is not just a regulatory requirement, it is a significant competitive advantage in today's market."
            </Typography>
          </Box>
          
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, mt: 5 }}>Strategic Implementation</Typography>
          <Typography sx={{ mb: 2 }}>
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
          </Typography>
          
          <Typography sx={{ mb: 2 }}>
            Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
          </Typography>
        </Box>

        <Divider sx={{ my: 8 }} />
<Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3, p: 4, bgcolor: theme.palette.mode === 'light' ? '#F8FAFC' : '#1E293B', borderRadius: 4 }}>
          <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 80, height: 80, fontSize: '2rem' }}>{blog.author.charAt(0)}</Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>About {blog.author}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
              {blog.author} is a senior industry expert specializing in enterprise architecture and compliance strategies. With over 15 years of experience helping Fortune 500 companies navigate complex regulatory environments.
            </Typography>
            <Button variant="text" size="small" sx={{ fontWeight: 600 }}>View more articles</Button>
          </Box>
        </Box>
      </Container>
<Box sx={{ bgcolor: theme.palette.mode === 'light' ? '#F8FAFC' : '#0B0F19', py: 10, mt: 10, borderTop: `1px solid ${theme.palette.divider}` }}>
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 6, textAlign: 'center' }}>Related Articles</Typography>
          <Grid container spacing={4}>
            {relatedBlogs.map((b) => (
              <Grid size={{ xs: 12, md: 4 }} key={b.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', border: `1px solid ${theme.palette.divider}`, boxShadow: 'none', borderRadius: 3, '&:hover': { boxShadow: theme.shadows[4], transform: 'translateY(-4px)' }, transition: 'all 0.3s ease' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={b.image}
                    alt={b.title}
                  />
                  <CardContent sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
                    <Chip label={b.category} size="small" sx={{ alignSelf: 'flex-start', mb: 2, fontWeight: 600, borderRadius: 1, bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main }} />
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, lineHeight: 1.3 }}>{b.title}</Typography>
                    <Box sx={{ mt: 'auto' }}>
                      <Button variant="outlined" fullWidth onClick={() => navigate(`/blogs/${b.id}`)} sx={{ borderRadius: 2 }}>
                        Read More
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default BlogDetails;
