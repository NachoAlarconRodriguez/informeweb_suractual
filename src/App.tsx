import { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';
import { 
  Globe, Camera, LayoutDashboard, Users, 
  TrendingUp, Clock, MousePointer2, MapPin, Target, Info, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const App = () => {
  const [activeTab, setActiveTab] = useState('resumen');

  // Colores de Marca (Mavix Style)
  const colors = {
    primary: '#002B5B', // Azul Mavix
    secondary: '#FF6B00', // Naranja Mavix
    accent: '#004C99',
    light: '#F4F7FA',
    text: '#1A1A1A',
    gray: '#666'
  };

  const cityData = [
    { name: 'Santiago', value: 45 },
    { name: 'P. Montt', value: 30 },
    { name: 'Osorno', value: 15 },
    { name: 'Otros', value: 10 },
  ];

  // Datos Instagram
  const igReachData = [
    { day: 'Sem 1', reach: 180000 },
    { day: 'Sem 2', reach: 450000 },
    { day: 'Sem 3', reach: 820000 },
    { day: 'Sem 4', reach: 1100000 },
  ];

  const genderData = [
    { name: 'Mujeres', value: 53.3 },
    { name: 'Hombres', value: 46.7 },
  ];

  const StatCard = ({ icon: Icon, title, value, subtext, trend, delay = 0 }: any) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-blue-50 rounded-xl group-hover:scale-110 transition-transform">
          <Icon size={24} color={colors.primary} />
        </div>
        {trend && (
          <span className="text-emerald-500 text-sm font-bold flex items-center bg-emerald-50 px-2 py-1 rounded-full">
            <TrendingUp size={14} className="mr-1" /> {trend}
          </span>
        )}
      </div>
      <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
      <p className="text-3xl font-bold mt-1 text-slate-800 tracking-tight">{value}</p>
      <p className="text-xs text-slate-400 mt-2">{subtext}</p>
    </motion.div>
  );

  const TooltipTip = ({ text }: { text: string }) => (
    <div className="flex items-start gap-3 bg-orange-50/50 p-4 rounded-xl border border-orange-100 mt-4 backdrop-blur-sm">
      <div className="p-1 bg-orange-500 rounded-full text-white shrink-0">
        <Info size={14} />
      </div>
      <p className="text-sm text-orange-900 leading-relaxed italic">"{text}"</p>
    </div>
  );

  const TabButton = ({ id, label, icon: Icon }: any) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={cn(
        "flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-500 whitespace-nowrap relative group",
        activeTab === id 
          ? "text-white bg-gradient-to-r from-[#002B5B] to-[#FF6B00] shadow-xl shadow-orange-500/20 scale-105" 
          : "text-blue-100 hover:text-white hover:bg-white/10"
      )}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 pb-20 selection:bg-orange-100 selection:text-orange-900">
      {/* Premium Header */}
      <header className="sticky top-0 z-50 bg-[#002B5B] text-white shadow-xl overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-6 relative">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4 group cursor-default">
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8, ease: "anticipate" }}
                className="w-12 h-12 bg-gradient-to-br from-[#002B5B] via-[#004C99] to-[#FF6B00] rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg border border-white/20"
              >
                S
              </motion.div>
              <div>
                <h1 className="text-2xl font-black tracking-tighter uppercase italic bg-gradient-to-r from-white via-blue-100 to-orange-400 bg-clip-text text-transparent">SurActual<span className="text-orange-500">.cl</span></h1>
                <p className="text-blue-200/70 text-xs font-bold tracking-widest uppercase">Media Intelligence Report 2026</p>
              </div>
            </div>
            
            <nav className="flex bg-blue-950/40 backdrop-blur-md p-1.5 rounded-full border border-white/10 overflow-x-auto no-scrollbar max-w-full">
              <TabButton id="resumen" label="Resumen" icon={LayoutDashboard} />
              <TabButton id="web" label="Web (GA4)" icon={Globe} />
              <TabButton id="ig" label="Instagram" icon={Camera} />
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <AnimatePresence mode="wait">
          {/* TAB: RESUMEN */}
          {activeTab === 'resumen' && (
            <motion.div 
              key="resumen"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <div className="relative bg-[#002B5B] overflow-hidden rounded-[2.5rem] shadow-2xl group mb-12">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-orange-500/20 to-transparent mix-blend-overlay" />
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500 rounded-full blur-[100px] opacity-10" />
                
                <div className="relative p-10 md:p-14 flex flex-col md:flex-row justify-between items-center gap-10">
                  <div className="text-center md:text-left space-y-4">
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-2">
                      <Target size={20} className="text-orange-400" />
                      <span className="text-xs font-bold uppercase tracking-widest text-white">Visión Estratégica</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">Resultados que <br/>Impulsan tu Marca</h2>
                    <p className="text-blue-100/70 max-w-md">Un ecosistema digital diseñado para maximizar la visibilidad y el retorno de inversión en el sur de Chile.</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-xl p-8 rounded-[2rem] border border-white/20 text-center min-w-[240px]">
                    <motion.p 
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-6xl font-black text-white mb-2"
                    >
                      1,1M+
                    </motion.p>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-400">Alcance Mensual Total</p>
                  </div>
                </div>
              </div>

              <section>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-black text-slate-800 flex items-center gap-3">
                    <div className="w-2 h-8 bg-gradient-to-b from-[#002B5B] to-[#FF6B00] rounded-full" />
                    Vista General de Inversión
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <StatCard 
                    icon={Users} 
                    title="Alcance Total Mensual" 
                    value="1,1M+" 
                    subtext="Usuarios únicos combinados (Web + IG)"
                    trend="+45% vs mes anterior"
                    delay={0.1}
                  />
                  <StatCard 
                    icon={MousePointer2} 
                    title="Impactos Visuales" 
                    value="120k+" 
                    subtext="Impresiones de marca estimadas"
                    delay={0.2}
                  />
                  <StatCard 
                    icon={Target} 
                    title="Público Objetivo" 
                    value="25-44 años" 
                    subtext="Segmento con mayor poder de compra"
                    delay={0.3}
                  />
                </div>
              </section>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100"
                >
                  <h3 className="text-xl font-bold mb-8 text-slate-800">Presencia Geográfica Principal</h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={cityData} layout="vertical" margin={{ left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                        <XAxis type="number" hide />
                        <YAxis 
                          dataKey="name" 
                          type="category" 
                          width={100} 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }}
                        />
                        <Tooltip 
                          cursor={{ fill: '#f8fafc' }}
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar 
                          dataKey="value" 
                          fill={colors.primary} 
                          radius={[0, 10, 10, 0]} 
                          barSize={32}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-8 flex items-center justify-center gap-2 text-slate-500 text-sm bg-slate-50 py-3 rounded-xl">
                    <MapPin size={16} className="text-orange-500" />
                    Fuerte liderazgo en la Región de Los Lagos y Santiago.
                  </div>
                </motion.div>

                <div className="flex flex-col justify-center space-y-8">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-black text-slate-800 leading-tight">¿Por qué invertir en <span className="text-orange-500">Sur Actual</span>?</h3>
                    <div className="space-y-4">
                      {[
                        { title: "Audiencia Orgánica", desc: "El tráfico no es forzado, la gente busca activamente el contenido." },
                        { title: "Crecimiento Acelerado", desc: "+233% de alcance en Instagram en los últimos 30 días." },
                        { title: "Multicanalidad", desc: "Tu marca vive donde vive el lector: Google e Instagram." }
                      ].map((item, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + (i * 0.1) }}
                          className="flex gap-4 p-4 rounded-2xl hover:bg-white transition-colors border border-transparent hover:border-slate-100"
                        >
                          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 shadow-sm shadow-emerald-200/50">
                            <ChevronRight size={20} />
                          </div>
                          <div>
                            <p className="text-slate-800 font-bold mb-1">{item.title}</p>
                            <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <TooltipTip text="Para un inversor, estos números representan seguridad. Una tasa de crecimiento de triple dígito indica que es el momento perfecto para entrar." />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB: WEB */}
          {activeTab === 'web' && (
            <motion.div 
              key="web"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <div className="relative bg-[#002B5B] overflow-hidden rounded-[2.5rem] shadow-2xl group mb-12">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 via-blue-900/40 to-transparent mix-blend-overlay" />
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-400 rounded-full blur-[100px] opacity-10" />
                
                <div className="relative p-10 md:p-14 flex flex-col md:flex-row justify-between items-center gap-10">
                  <div className="text-center md:text-left space-y-4">
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-2">
                      <Globe size={20} className="text-blue-400" />
                      <span className="text-xs font-bold uppercase tracking-widest text-white">Rendimiento Web</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">Tráfico Orgánico <br/>de Alta Calidad</h2>
                    <p className="text-blue-100/70 max-w-md">Analizamos el comportamiento de nuestra audiencia para ofrecer espacios publicitarios efectivos y medibles.</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-xl p-8 rounded-[2rem] border border-white/20 text-center min-w-[240px]">
                    <motion.p 
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-6xl font-black text-white mb-2"
                    >
                      56k+
                    </motion.p>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">Páginas Vistas</p>
                  </div>
                </div>
              </div>

              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                <StatCard icon={Users} title="Usuarios Nuevos" value="208" subtext="En el periodo" delay={0.1} />
                <StatCard icon={LayoutDashboard} title="Eventos" value="1,2 mil" subtext="En el periodo" delay={0.2} />
                <StatCard icon={Clock} title="Tiempo de Interacción" value="1 min 24 seg" subtext="Media por sesión" delay={0.3} />
                <StatCard icon={MousePointer2} title="% de Interacción" value="58,9%" subtext="Engagement rate" delay={0.4} />
                <StatCard icon={Target} title="Impresiones de Búsqueda" value="116" subtext="Visibilidad en Google" delay={0.5} />
              </section>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                  <h3 className="text-xl font-bold mb-8 text-slate-800">Fidelidad de Usuarios</h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Nuevos', value: 18000 },
                            { name: 'Recurrentes', value: 5000 },
                          ]}
                          innerRadius={80}
                          outerRadius={105}
                          paddingAngle={8}
                          dataKey="value"
                        >
                          <Cell fill={colors.primary} stroke="none" />
                          <Cell fill={colors.secondary} stroke="none" />
                        </Pie>
                        <Tooltip 
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center gap-8 mt-8">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-[#002B5B] shadow-lg shadow-blue-900/20" />
                      <span className="text-sm font-semibold text-slate-600">Nuevos (78%)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-[#FF6B00] shadow-lg shadow-orange-500/20" />
                      <span className="text-sm font-semibold text-slate-600">Recurrentes (22%)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col">
                  <h3 className="text-xl font-bold mb-6 text-slate-800">Tip para el Anunciante (Web)</h3>
                  <div className="space-y-6">
                    <div className="p-6 bg-slate-50 rounded-2xl border-l-4 border-orange-500">
                      <p className="text-slate-700 leading-relaxed">
                        Dado que el <strong className="text-orange-600">91% del tráfico es móvil</strong>, los banners deben ser verticales (320x50 o 300x250) para asegurar que no se pierdan en la pantalla del smartphone.
                      </p>
                    </div>
                    <div className="p-6 bg-blue-50/50 rounded-2xl text-blue-900 border border-blue-100 backdrop-blur-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp size={20} className="text-blue-600" />
                        <p className="font-bold">Insight Pro</p>
                      </div>
                      <p className="text-sm text-blue-800/80 leading-relaxed">
                        El tráfico directo y de búsqueda orgánica indica que Sur Actual es un sitio de consulta frecuente, lo que otorga <strong className="text-blue-900">autoridad</strong> a la marca que se anuncie en él.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB: INSTAGRAM */}
          {activeTab === 'ig' && (
            <motion.div 
              key="ig"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <div className="relative bg-[#002B5B] overflow-hidden rounded-[2.5rem] shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/40 via-orange-500/40 to-transparent mix-blend-overlay" />
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500 rounded-full blur-[100px] opacity-20" />
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-600 rounded-full blur-[100px] opacity-20" />
                
                <div className="relative p-10 md:p-14 flex flex-col md:flex-row justify-between items-center gap-10">
                  <div className="text-center md:text-left space-y-4">
                  <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-2">
                    <Camera size={20} className="text-orange-400" />
                    <span className="text-xs font-bold uppercase tracking-widest text-white">Impulso Social</span>
                  </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">Impacto Digital <br/>Sin Precedentes</h2>
                    <p className="text-blue-100/70 max-w-md">Nuestro alcance se ha disparado este último mes, convirtiéndonos en el referente digital de la región.</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-xl p-8 rounded-[2rem] border border-white/20 text-center min-w-[240px] group-hover:scale-105 transition-transform duration-500">
                    <motion.p 
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-6xl font-black text-white mb-2"
                    >
                      3,8M
                    </motion.p>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-400">Visualizaciones Totales</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard icon={Camera} title="Visualizaciones" value="3,8 mill" subtext="Último periodo" delay={0.1} />
                <StatCard icon={Users} title="Alcance" value="1,1 mill" subtext="Cuentas alcanzadas" delay={0.2} />
                <StatCard icon={TrendingUp} title="Interacción Contenido" value="151,2 mil" subtext="Engagement total" delay={0.3} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                  <h3 className="text-xl font-bold mb-8 text-slate-800">Demografía de Audiencia</h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={genderData}
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={95}
                          dataKey="value"
                          paddingAngle={5}
                          label={({name, value}) => `${name}: ${value}%`}
                        >
                          <Cell fill="#6366f1" stroke="none" />
                          <Cell fill="#ec4899" stroke="none" />
                        </Pie>
                        <Tooltip 
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <TooltipTip text="Es un público equilibrado. Perfecto para marcas de consumo masivo, servicios financieros o automotrices." />
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col">
                  <h3 className="text-xl font-bold mb-8 text-slate-800">Crecimiento de Alcance Semanal</h3>
                  <div className="h-64 mt-auto">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={igReachData}>
                        <defs>
                          <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={colors.secondary} stopOpacity={0.3}/>
                            <stop offset="95%" stopColor={colors.secondary} stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis 
                          dataKey="day" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: '#94a3b8', fontSize: 12 }}
                        />
                        <YAxis hide />
                        <Tooltip 
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="reach" 
                          stroke={colors.secondary} 
                          strokeWidth={4}
                          fillOpacity={1} 
                          fill="url(#colorReach)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-8 p-6 bg-orange-50 rounded-2xl border-l-4 border-orange-500 text-sm text-orange-900 leading-relaxed font-medium">
                    <strong className="block mb-1 text-orange-600">Recomendación Estratégica:</strong> 
                    Invertir en Reels de contenido patrocinado para aprovechar la tendencia viral actual del perfil.
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="max-w-7xl mx-auto px-8 py-16 mt-12 border-t border-slate-200">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#002B5B] to-[#FF6B00] rounded-lg flex items-center justify-center text-white font-bold text-xs">M</div>
            <span className="font-black text-slate-800 tracking-tighter uppercase">Mavix <span className="text-slate-400">Analytics</span></span>
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">&copy; 2026 SurActual.cl — Media Strategy Report</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
