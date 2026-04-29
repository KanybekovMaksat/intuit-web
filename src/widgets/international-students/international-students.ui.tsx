import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import {
  Globe,
  Target,
  Users,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Award,
  Building2,
  Calendar,
  Layers,
} from 'lucide-react'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

const StatCard = ({
  icon: Icon,
  value,
  label,
  suffix = '',
}: {
  icon: any
  value: number
  label: string
  suffix?: string
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-full border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 backdrop-blur-sm overflow-hidden group rounded-lg">
        <Box className="absolute top-0 left-0 w-1 h-full bg-blue-600 group-hover:w-2 transition-all duration-300 rounded-lg" />
        <CardContent className="flex flex-col items-center text-center p-6">
          <Box className="p-3 bg-blue-50 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
            <Icon size={32} className="text-blue-600" />
          </Box>
          <Typography variant="h4" className="font-bold text-gray-900 mb-1">
            {inView ? <CountUp end={value} duration={2.5} /> : 0}
            {suffix}
          </Typography>
          <Typography variant="body2" className="text-gray-600 font-medium">
            {label}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const PartnershipCard = ({ title, content, icon: Icon }: { title: string, content: string, icon: any }) => (
  <Card className="border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 h-full">
    <CardContent className="p-6">
      <Box className="flex items-center mb-4">
        <Box className="p-2 bg-blue-100 rounded-lg mr-4">
          <Icon size={24} className="text-blue-700" />
        </Box>
        <Typography variant="h6" className="font-bold text-gray-800">
          {title}
        </Typography>
      </Box>
      <Typography variant="body2" className="text-gray-600 leading-relaxed">
        {content}
      </Typography>
    </CardContent>
  </Card>
)

export const InternationalStudents = () => {
  const { t, i18n } = useTranslation()

  // Default to Kyrgyz on mount as per user request
  useEffect(() => {
    if (i18n.language !== 'kg' && !localStorage.getItem('i18nextLng')) {
       i18n.changeLanguage('kg')
    }
  }, [i18n])

  const listItems = t('internationalPage.exchange.items', { returnObjects: true }) as string[]
  const projectAreas = t('internationalPage.globalEngagement.projectAreas.items', { returnObjects: true }) as string[]
  const duties = t('internationalPage.roles.duties', { returnObjects: true }) as any[]

  return (
    <Box className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <Box 
        className="relative py-24 rounded-lg overflow-hidden" 
        style={{ 
          background: 'linear-gradient(135deg, #00956F 0%, #00956F 50%, #00956F 100%)' 
        }}
      >
        <Box className="absolute inset-0 opacity-10">
          <Globe className="absolute -right-20 -top-20 w-96 h-96 text-white rotate-12" />
        </Box>
        <Container maxWidth="lg" className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="overline"
              className="text-white font-bold tracking-widest block mb-4"
            >
              {t('internationalPage.hero.department')}
            </Typography>
            <Typography
              variant="h2"
              className="text-white font-black mb-6 leading-tight"
              style={{ 
                fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                textShadow: '0 2px 10px rgba(0,0,0,0.2)'
              }}
            >
              {t('internationalPage.hero.title')} <br />
              <span className="text-blue-400">{t('internationalPage.hero.subtitle')}</span>
            </Typography>
            <Typography
              variant="h5"
              className="text-white max-w-2xl leading-relaxed mb-8 opacity-90 font-light"
            >
              {t('internationalPage.hero.description')}
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Facts & Figures */}
      <Container maxWidth="lg" className="-mt-16 mb-20 relative z-20">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard icon={Users} value={1500} suffix="+" label={t('internationalPage.stats.students')} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard icon={Building2} value={15} label={t('internationalPage.stats.partners')} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard icon={Globe} value={10} suffix="+" label={t('internationalPage.stats.countries')} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard icon={Calendar} value={2006} label={t('internationalPage.stats.founded')} />
          </Grid>
        </Grid>
      </Container>

      {/* Who We Are & Mission */}
      <Container maxWidth="lg" className="mb-24">
        <Grid container spacing={8} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Box className="flex items-center mb-4">
                <Box className="p-2 bg-[#00956F] rounded mr-3">
                  <Users className="text-white" size={24} />
                </Box>
                <Typography variant="h4" className="font-bold text-gray-900">
                  {t('internationalPage.whoWeAre.title')}
                </Typography>
              </Box>
              <Typography variant="body1" className="text-gray-700 text-lg leading-relaxed mb-6">
                {t('internationalPage.whoWeAre.text1')}
              </Typography>
              <Typography variant="body1" className="text-gray-700 text-lg leading-relaxed mb-6">
                {t('internationalPage.whoWeAre.text2')}
              </Typography>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-3xl shadow-xl border border-blue-50 relative overflow-hidden"
            >
              <Box className="absolute top-0 right-0 p-4 opacity-5">
                <Target size={120} />
              </Box>
              <Box className="flex items-center mb-4">
                <Box className="p-2 bg-indigo-600 rounded mr-3">
                  <Target className="text-white" size={24} />
                </Box>
                <Typography variant="h4" className="font-bold text-gray-900">
                  {t('internationalPage.mission.title')}
                </Typography>
              </Box>
              <Typography variant="body1" className="text-gray-700 text-lg leading-relaxed italic border-l-4 border-indigo-500 pl-4 mb-6">
                "{t('internationalPage.mission.quote')}"
              </Typography>
              <Typography variant="body1" className="text-gray-700 leading-relaxed">
                {t('internationalPage.mission.description')}
              </Typography>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
      <Box className="bg-gray-100 py-24 mb-24">
        <Container maxWidth="lg">
          <Typography variant="h3" className="font-bold text-center mb-4 text-gray-900">
            {t('internationalPage.globalEngagement.title')}
          </Typography>
          <Typography variant="h6" className="text-center mb-12 text-gray-600 max-w-2xl mx-auto">
            {t('internationalPage.globalEngagement.description')}
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <PartnershipCard
                icon={Briefcase}
                title={t('internationalPage.globalEngagement.partnership.title')}
                content={t('internationalPage.globalEngagement.partnership.content')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <PartnershipCard
                icon={Layers}
                title={t('internationalPage.globalEngagement.jointProjects.title')}
                content={t('internationalPage.globalEngagement.jointProjects.content')}
              />
            </Grid>
          </Grid>

          <Box className="mt-12 bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
            <Typography variant="h5" className="font-bold mb-6 flex items-center">
              <CheckCircle2 className="text-green-500 mr-2" /> {t('internationalPage.globalEngagement.projectAreas.title')}
            </Typography>
            <Grid container spacing={2}>
              {Array.isArray(projectAreas) && projectAreas.map((item, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Box className="flex items-start p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                    <Box className="mt-1 mr-3 flex-shrink-0">
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    </Box>
                    <Typography variant="body2" className="text-gray-700 font-medium">
                      {item}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Exchange & Mobility */}
      <Container maxWidth="lg" className="mb-24">
        <Grid container spacing={8} alignItems="stretch">
          <Grid item xs={12} lg={7}>
            <Box className="h-full flex flex-col justify-center">
              <Typography variant="h3" className="font-bold text-gray-900 mb-6">
                {t('internationalPage.exchange.title')} <span className="text-blue-600">{t('internationalPage.exchange.subtitle')}</span>
              </Typography>
              <Typography variant="body1" className="text-gray-700 text-lg leading-relaxed mb-6">
                {t('internationalPage.exchange.text1')}
              </Typography>
              <Typography variant="body1" className="text-gray-700 leading-relaxed mb-8">
                {t('internationalPage.exchange.text2')}
              </Typography>

              <List className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Array.isArray(listItems) && listItems.map((text, index) => (
                  <ListItem key={index} className="px-0 py-1">
                    <ListItemIcon className="min-w-[40px]">
                      <CheckCircle2 size={20} className="text-blue-600" />
                    </ListItemIcon>
                    <ListItemText
                      primary={text}
                      primaryTypographyProps={{ variant: 'body2', className: 'text-gray-800 font-medium' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>
          <Grid item xs={12} lg={5}>
            <Box className="rounded-3xl shadow-2xl overflow-hidden h-full flex flex-col" style={{ background: 'linear-gradient(135deg, #00956F 0%, #00956F 100%)' }}>
              <Box className="p-8">
                <Typography variant="h5" className="font-bold mb-6 flex items-center text-white">
                  <Award className="mr-2" /> {t('internationalPage.strategicPartners.title')}
                </Typography>

                <Card 
                  sx={{ 
                    bgcolor: 'rgba(255, 255, 255, 0.1)', 
                    color: 'white',
                    mb: 3, 
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: 'none',
                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.15)' }
                  }}
                >
                  <CardContent className="p-6">
                    <Box className="flex justify-between items-start mb-4">
                      <Typography variant="h6" className="font-bold">{t('internationalPage.strategicPartners.erasmus.title')}</Typography>
                      <Box className="p-1 bg-white rounded flex items-center justify-center w-10 h-10 overflow-hidden shadow-sm">
                        <Globe size={24} className="text-blue-600" />
                      </Box>
                    </Box>
                    <Typography variant="body2" className="text-blue-50 opacity-90 leading-relaxed">
                      {t('internationalPage.strategicPartners.erasmus.description')}
                    </Typography>
                  </CardContent>
                </Card>

                <Card 
                  sx={{ 
                    bgcolor: 'rgba(255, 255, 255, 0.1)', 
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: 'none',
                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.15)' }
                  }}
                >
                  <CardContent className="p-6">
                    <Box className="flex justify-between items-start mb-4">
                      <Typography variant="h6" className="font-bold">{t('internationalPage.strategicPartners.iaeste.title')}</Typography>
                      <Box className="p-1 bg-blue-100 rounded flex items-center justify-center w-10 h-10 overflow-hidden shadow-sm">
                        <Briefcase size={24} className="text-blue-700" />
                      </Box>
                    </Box>
                    <Typography variant="body2" className="text-blue-50 opacity-90 leading-relaxed">
                      {t('internationalPage.strategicPartners.iaeste.description')}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Roles & Responsibilities */}
      <Box className="bg-white py-24 border-y border-gray-100">
        <Container maxWidth="lg">
          <Typography variant="h3" className="font-bold text-center mb-16 text-gray-900">
            {t('internationalPage.roles.title')}
          </Typography>
          <Grid container spacing={4}>
            {Array.isArray(duties) && duties.map((duty: any, index: number) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="h-full"
                >
                  <Box className="flex items-start mb-3">
                    <Typography variant="h1" className="text-4xl font-black text-blue-100 mr-4 leading-none select-none">
                      {String(index + 1).padStart(2, '0')}
                    </Typography>
                    <Typography variant="h6" className="font-bold leading-tight mt-1 text-gray-800">
                      {duty.title}
                    </Typography>
                  </Box>
                  <List dense>
                    {Array.isArray(duty.items) && duty.items.map((item: string, i: number) => (
                      <ListItem key={i} className="px-0 items-start">
                        <ListItemIcon className="min-w-[24px] mt-1">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                        </ListItemIcon>
                        <ListItemText
                          primary={item}
                          primaryTypographyProps={{ variant: 'body2', className: 'text-gray-600' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Team & Contact Section */}
      <Container maxWidth="lg" className="py-24">
        <Grid container spacing={6}>
          <Grid item xs={12} md={7}>
            <Box className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
              <Box className="bg-blue-600 p-6">
                <Typography variant="h5" className="text-white font-bold flex items-center">
                  <Mail className="mr-2" /> {t('internationalPage.contact.title')}
                </Typography>
              </Box>
              <Box className="p-8">
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                    <Box className="flex items-start mb-6">
                      <Box className="p-2 bg-blue-50 rounded-lg mr-4">
                        <MapPin className="text-blue-600" size={20} />
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" className="text-gray-500 font-bold uppercase tracking-wider">{t('internationalPage.contact.addressLabel')}</Typography>
                        <Typography variant="body1" className="text-gray-800 whitespace-pre-line">{t('internationalPage.contact.addressValue')}</Typography>
                      </Box>
                    </Box>
                    <Box className="flex items-start">
                      <Box className="p-2 bg-blue-50 rounded-lg mr-4">
                        <Phone className="text-blue-600" size={20} />
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" className="text-gray-500 font-bold uppercase tracking-wider">{t('internationalPage.contact.phoneLabel')}</Typography>
                        <Typography variant="body1" className="text-gray-800">+996 770 604 233</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box className="flex items-start mb-6">
                      <Box className="p-2 bg-blue-50 rounded-lg mr-4">
                        <Mail className="text-blue-600" size={20} />
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" className="text-gray-500 font-bold uppercase tracking-wider">{t('internationalPage.contact.emailLabel')}</Typography>
                        <Typography variant="body1" className="text-gray-800">vise.edu.kg@gmail.com</Typography>
                      </Box>
                    </Box>
                    <Box className="flex items-start">
                      <Box className="p-2 bg-blue-50 rounded-lg mr-4">
                        <Building2 className="text-blue-600" size={20} />
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" className="text-gray-500 font-bold uppercase tracking-wider">{t('internationalPage.contact.locationLabel')}</Typography>
                        <Typography variant="body1" className="text-gray-800">{t('internationalPage.contact.locationValue')}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Card className="h-full border-none shadow-xl bg-gradient-to-br from-white to-gray-50 rounded-3xl overflow-hidden group">
              <Box className="bg-gray-100 flex justify-center py-10 relative">
                <Box className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Award size={100} />
                </Box>
                <Avatar
                  src="/zhazgul.jpeg"
                  alt={t('internationalPage.team.name')}
                  className="w-40 h-40 border-4 border-white shadow-lg bg-blue-600"
                >
                  <Users size={60} />
                </Avatar>
              </Box>
              <CardContent className="text-center p-8">
                <Typography variant="h5" className="font-black text-gray-900 mb-1">
                  {t('internationalPage.team.name')}
                </Typography>
                <Typography variant="body1" className="text-blue-600 font-bold mb-6">
                  {t('internationalPage.team.position')}
                </Typography>
                <Divider className="mb-6 mx-auto w-12" />
                <Typography variant="body2" className="text-gray-500 italic">
                  {t('internationalPage.team.bio')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
