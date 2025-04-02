import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@components/common/Button/Button';
import { TextInput } from '@components/common/Input/TextInput/TextInput';

// Type definitions
interface ColorState {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
  backgroundColor: string;
}

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface ColorPickerState {
  rgb: RGB;
}

type ColorKey = keyof ColorState;

const ColorSchemeTool: React.FC = () => {
  const defaultColors: ColorState = {
    primaryColor: '#3498db',
    secondaryColor: '#2ecc71',
    accentColor: '#e74c3c',
    textColor: '#333333',
    backgroundColor: '#f5f5f5',
  };

  // State for managing colors
  const [colors, setColors] = useState<ColorState>(() => {
    try {
      const savedColors = localStorage.getItem('siteColorScheme');
      return savedColors ? JSON.parse(savedColors) : defaultColors;
    } catch (error) {
      console.error('Error loading saved colors:', error);
      return defaultColors;
    }
  });
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [copyMessage, setCopyMessage] = useState<string>('');
  const [activeColorKey, setActiveColorKey] = useState<ColorKey | null>(null);
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [showCssOutput, setShowCssOutput] = useState<boolean>(false);
  const [cssOutput, setCssOutput] = useState<string>('');

  // Convert hex to RGB
  const hexToRgb = (hex: string): RGB => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : {r: 0, g: 0, b: 0};
  };

  // Convert RGB to hex
  const rgbToHex = (r: number, g: number, b: number): string => {
    return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
  };

  // For active color
  const [colorPickerState, setColorPickerState] = useState<ColorPickerState>({
    rgb: {r: 0, g: 0, b: 0}
  });

  // Update global CSS variables
  useEffect(() => {
    Object.entries(colors).forEach(([key, value]) => {
      const cssVarName = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      document.documentElement.style.setProperty(cssVarName, value);
    });

    try {
      localStorage.setItem('siteColorScheme', JSON.stringify(colors));
    } catch (error) {
      console.error('Error saving colors to localStorage:', error);
    }
  }, [colors]);

  // Handle color preview click
  const handleColorPreviewClick = (colorKey: ColorKey): void => {
    const rgb = hexToRgb(colors[colorKey]);
    setColorPickerState({rgb});
    setActiveColorKey(colorKey);
    setShowPicker(true);
  };

  // Handle color picker close
  const handleCloseColorPicker = (): void => {
    setShowPicker(false);
    setActiveColorKey(null);
  };

  // Handle color input change
  const handleColorInputChange = (name: string, value: string): void => {
    if (name !== 'colorValue' || !activeColorKey) return;

    // Validate hex color
    const isValidHex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);
    if (!isValidHex) return;

    const rgb = hexToRgb(value);
    setColorPickerState({rgb});

    setColors(prev => ({
      ...prev,
      [activeColorKey]: value
    }));
  };

  // Update colors from RGB sliders
  const handleRgbChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const {name, value} = e.target;
    if (name !== 'r' && name !== 'g' && name !== 'b') return;

    const newRgb: RGB = {
      ...colorPickerState.rgb,
      [name]: Number(value)
    };
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);

    setColorPickerState({
      ...colorPickerState,
      rgb: newRgb
    });

    if (activeColorKey) {
      setColors(prev => ({
        ...prev,
        [activeColorKey]: newHex
      }));
    }
  };

  // Reset colors to default
  const handleReset = (): void => {
    setColors(defaultColors);
    setCopyMessage('Colors reset to defaults');
    setTimeout(() => setCopyMessage(''), 2000);
  };

  // Generate CSS variables output
  const generateCssVariables = (): string => {
    const cssVars = Object.entries(colors).map(([key, value]) => {
      const cssVarName = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      return `${cssVarName}: ${value};`;
    }).join('\n  ');

    return `:root {\n  ${cssVars}\n}`;
  };

  // Export CSS variables
  const handleExportCss = (): void => {
    const cssVars = generateCssVariables();
    setCssOutput(cssVars);
    setShowCssOutput(true);
  };

  // Copy CSS to clipboard
  const handleCopyCss = (): void => {
    const cssVars = generateCssVariables();

    navigator.clipboard.writeText(cssVars)
             .then(() => {
               setCopyMessage('CSS copied to clipboard!');
               setTimeout(() => setCopyMessage(''), 2000);
             })
             .catch(err => {
               console.error('Failed to copy: ', err);
               setCopyMessage('Failed to copy');
             });
  };

  // Toggle collapsed state
  const toggleCollapse = (): void => {
    setIsCollapsed(!isCollapsed);
  };

  // Click outside hook for color picker
  const colorPickerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (colorPickerRef.current &&
        event.target instanceof Node &&
        !colorPickerRef.current.contains(event.target)) {
        handleCloseColorPicker();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [colorPickerRef]);

  // Color palette for quick selection
  const colorPalette: string[] = [
    '#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6',
    '#1abc9c', '#d35400', '#c0392b', '#7f8c8d', '#2c3e50',
    '#2980b9', '#27ae60', '#e67e22', '#8e44ad', '#16a085'
  ];

  return (
    <div
      className="fixed top-5 right-5 bg-white rounded-lg shadow-lg z-50 w-72 transition-transform duration-300 ease-in-out"
      style={{transform: isCollapsed ? 'translateX(calc(100% - 40px))' : 'translateX(0)'}}
    >
      {/* Tool Header */}
      <div
        className="bg-blue-500 text-white px-4 py-3 rounded-t-lg flex justify-between items-center cursor-pointer"
        onClick={toggleCollapse}
        style={{backgroundColor: colors.primaryColor}}
      >
        <span className="font-medium">Color Scheme Tool</span>
        <button
          className="bg-transparent border-none text-xl text-white cursor-pointer"
          type="button"
        >
          {isCollapsed ? '◀' : '▶'}
        </button>
      </div>

      {/* Tool Content */}
      <div className="p-4 max-h-96 overflow-y-auto">
        {(Object.entries(colors) as [ColorKey, string][]).map(([key, value]) => (
          <div key={key} className="mb-4">
            <div className="flex items-center mb-1">
              <div
                className="w-6 h-6 rounded-full mr-2 border border-gray-200 cursor-pointer"
                style={{backgroundColor: value}}
                onClick={() => handleColorPreviewClick(key)}
              />
              <span className="w-32 inline-block">
                {key.replace(/([A-Z])/g, ' $1').trim()}:
              </span>
            </div>
            <div className="flex items-center">
              <input
                type="text"
                value={value}
                readOnly
                className="w-20 px-2 py-1 border border-gray-300 rounded mr-2 text-sm font-mono"
                onClick={() => handleColorPreviewClick(key)}
              />
              <div
                className="flex-1 h-6 rounded cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #fff, ${value})`,
                  border: '1px solid #ddd'
                }}
                onClick={() => handleColorPreviewClick(key)}
              />
            </div>
          </div>
        ))}

        {showCssOutput && (
          <div className="mt-4 p-3 bg-gray-100 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-semibold">CSS Variables</h3>
              <button
                className="text-xs text-gray-500"
                onClick={() => setShowCssOutput(false)}
              >
                ✕
              </button>
            </div>
            <pre className="text-xs overflow-x-auto whitespace-pre-wrap">{cssOutput}</pre>
          </div>
        )}
      </div>

      {/* Custom Color Picker */}
      {showPicker && activeColorKey && (
        <div
          className="absolute left-full ml-2 top-0 bg-white p-4 rounded-lg shadow-lg z-50 w-64"
          ref={colorPickerRef}
        >
          <div className="flex justify-between items-center mb-3">
            <span className="font-medium">
              {activeColorKey.replace(/([A-Z])/g, ' $1').trim()}
            </span>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={handleCloseColorPicker}
              type="button"
            >
              ✕
            </button>
          </div>

          {/* Current color preview */}
          <div
            className="w-full h-24 rounded-lg mb-4 flex items-end justify-end p-2"
            style={{backgroundColor: colors[activeColorKey]}}
          >
            <TextInput
              name="colorValue"
              value={colors[activeColorKey]}
              onChange={handleColorInputChange}
              label="Hex"
            />
          </div>

          {/* RGB sliders */}
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <span className="w-10 text-sm">R</span>
              <input
                type="range"
                min="0"
                max="255"
                name="r"
                value={colorPickerState.rgb.r}
                onChange={handleRgbChange}
                className="flex-1"
                style={{accentColor: `rgb(${colorPickerState.rgb.r}, 0, 0)`}}
              />
              <span className="w-8 text-right text-sm">{colorPickerState.rgb.r}</span>
            </div>
            <div className="flex items-center mb-2">
              <span className="w-10 text-sm">G</span>
              <input
                type="range"
                min="0"
                max="255"
                name="g"
                value={colorPickerState.rgb.g}
                onChange={handleRgbChange}
                className="flex-1"
                style={{accentColor: `rgb(0, ${colorPickerState.rgb.g}, 0)`}}
              />
              <span className="w-8 text-right text-sm">{colorPickerState.rgb.g}</span>
            </div>
            <div className="flex items-center mb-3">
              <span className="w-10 text-sm">B</span>
              <input
                type="range"
                min="0"
                max="255"
                name="b"
                value={colorPickerState.rgb.b}
                onChange={handleRgbChange}
                className="flex-1"
                style={{accentColor: `rgb(0, 0, ${colorPickerState.rgb.b})`}}
              />
              <span className="w-8 text-right text-sm">{colorPickerState.rgb.b}</span>
            </div>
          </div>

          {/* Color palette */}
          <div className="mb-2">
            <div className="text-sm text-gray-600 mb-1">Quick Colors:</div>
            <div className="flex flex-wrap gap-1">
              {colorPalette.map((color, index) => (
                <div
                  key={index}
                  className="w-6 h-6 rounded-sm cursor-pointer border border-gray-200"
                  style={{backgroundColor: color}}
                  onClick={() => {
                    const rgb = hexToRgb(color);
                    setColorPickerState({rgb});

                    setColors(prev => ({
                      ...prev,
                      [activeColorKey]: color
                    }));
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tool Footer */}
      <div className="p-3 border-t border-gray-100 flex justify-between">
        <Button
          onClick={handleReset}
          variant="secondary"
          size="small"
        >
          Reset
        </Button>
        <Button
          onClick={handleCopyCss}
          variant="primary"
          size="small"
        >
          Copy CSS
        </Button>
        <Button
          onClick={handleExportCss}
          variant="outline"
          size="small"
        >
          Show CSS
        </Button>
      </div>

      {copyMessage && (
        <div
          className="absolute bottom-12 left-0 right-0 text-center text-sm text-green-600 bg-green-100 py-1 px-2 rounded mx-2">
          {copyMessage}
        </div>
      )}
    </div>
  );
};

export { ColorSchemeTool };