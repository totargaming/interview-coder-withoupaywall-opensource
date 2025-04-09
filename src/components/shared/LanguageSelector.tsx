import React from "react"

interface LanguageSelectorProps {
  currentLanguage: string
  setLanguage: (language: string) => void
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  setLanguage
}) => {
  const handleLanguageChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newLanguage = e.target.value
    
    try {
      // Save language preference to electron store
      await window.electronAPI.updateConfig({ language: newLanguage })
      
      // Update global language variable
      window.__LANGUAGE__ = newLanguage
      
      // Update state in React
      setLanguage(newLanguage)
      
      console.log(`Language changed to ${newLanguage}`);
    } catch (error) {
      console.error("Error updating language:", error)
    }
  }
  return (
    <div className="mb-3 px-2 space-y-1">
      <div className="flex items-center justify-between text-[13px] font-medium text-white/90">
        <span>Framework/Language</span>
        <select
          value={currentLanguage}
          onChange={handleLanguageChange}
          className="bg-black/80 text-white/90 rounded px-2 py-1 text-sm outline-none border border-white/10 focus:border-white/20"
          style={{ WebkitAppearance: 'menulist' }}
        >
          <option value="react" className="bg-black text-white">React</option>
          <option value="express" className="bg-black text-white">Express</option>
          <option value="react-express" className="bg-black text-white">React+Express</option>
          <option value="javascript" className="bg-black text-white">JavaScript</option>
          <option value="typescript" className="bg-black text-white">TypeScript</option>
          <option value="nodejs" className="bg-black text-white">Node.js</option>
          <option value="html" className="bg-black text-white">HTML/CSS</option>
          <option value="python" className="bg-black text-white">Python</option>
          <option value="java" className="bg-black text-white">Java</option>
          <option value="sql" className="bg-black text-white">SQL</option>
        </select>
      </div>
    </div>
  )
}
